"""
Runs the main GDetect Algorithm
"""

from gdetect.guards import verify_idinfo, verify_pictures
from gdetect.core import compute_facial_similarity, database_checking
from gdetect.database import session, Task
from gdetect.database.methods import add_user_to_database

from gdetect.utils import config, generate_embedding
from gdetect.utils.logger import logger


def process_information(
    selfie_image: bytes,
    id_image: bytes,
    full_name: str,
    email_address: str,
    retry_verification: bool,
):

    logger.info(
        f"[ Started ]: Task \n\t\
        Email: {email_address}, \n\t\
        Full Name: {full_name}"
    )
    logger.debug(f"Retry Verification: {retry_verification}")

    try:
        if not retry_verification:
            task = Task(
                email=email_address,
            )
        else:
            task = session.query(Task).filter(Task.email == email_address).one()
            logger.warning(
                f"Retry Verification is set to True but the email: {email_address} was not found in the database."
            )
            task.reset()
    except ValueError as err:
        logger.warning(err)
        return

    session.add(task)
    session.commit()

    failures_count = 0

    logger.info("[ Started ]: Validating ID Information")
    if config.enabled("id_info_validation"):
        passed_id_info_validation = verify_idinfo(full_name, id_image)

        if not passed_id_info_validation:
            logger.info("[ Failed ]: Validating ID Information\n")
            task.add_new_failure(status=6)
            failures_count += 1
            return
        else:
            logger.info("[ Success ]: Validating ID Information\n")
    else:
        logger.info("[ Skipping ]: Not Enabled\n")

    logger.info("[ Started ]: Detecting Faces in the images")
    if config.enabled("face_detection"):
        passed_face_detection = verify_pictures([selfie_image, id_image])
        if not passed_face_detection:
            logger.info("[ Failed ]: Detecting Faces\n")
            task.add_new_failure(status=3)
            failures_count += 1
            return
        else:
            logger.info("[ Success ]: Detecting Faces\n")
    else:
        logger.info("[ Skipping ]: Not Enabled\n")

    selfie_embedding = None
    id_embedding = None

    logger.info("[ Started ]: Performing Database Checking")
    if config.enabled("database_checking"):
        selfie_embedding = generate_embedding(selfie_image)
        id_embedding = generate_embedding(id_image)

        passed_database_selfie_similarity_checking = database_checking(selfie_embedding)
        passed_database_id_similarity_checking = database_checking(id_embedding)

        if (
            not passed_database_id_similarity_checking
            and not passed_database_selfie_similarity_checking
        ):
            logger.info(
                "[ Failed ]: Found similar face in the database,\n\t\
                Selfie: {passed_database_selfie_similarity_checking}\n\t\
                ID: {passed_database_selfie_similarity_checking}\n"
            )
            task.add_new_failure(status=7)
            failures_count += 1
        else:
            logger.debug(
                "[ Success ]: No verified users were detected to have similar facial structure\n"
            )
    else:
        logger.info("[ Skipping ]: Database Checking\n")

    logger.info("[ Started ]: Performing Facial Similarity Detection")
    if config.enabled("facial_similarity_detection"):

        passed_facial_similarity_detection = compute_facial_similarity(  # type: ignore
            id_image, selfie_image
        )

        if not passed_facial_similarity_detection:
            logger.info(
                "[ Failed ]: Images uploaded doesn't have the same facial structure\n"
            )
            task.add_new_failure(status=4)
            failures_count += 1
            return
        else:
            logger.info("[ Success ]: Passed Facial Similarity Detection\n")
    else:
        logger.info("[ Skipping ]: Facial Similarity not enabled\n")

    logger.info("[ Started ]: ID type validation")
    if config.enabled("id_type_validation"):
        passed_id_type_validation = True
        if not passed_id_type_validation:
            logger.info("[ Failed ]: ID Type not supported\n")
            task.add_new_failure(status=5)
            failures_count += 1
            return
        else:
            logger.info("[ Success ]: Detected supported ID type\n")
    else:
        logger.info("[ Skipping ]: ID type validation")

    if failures_count == 0:
        logger.debug("Adding User to database")
        add_user_to_database(
            email=email_address,
            full_name=full_name,
            selfie_vector_embedding=selfie_embedding,  # type: ignore
            id_vector_embedding=id_embedding,  # type: ignore
        )
        task.success()
    logger.info(f"Finished processing email: {email_address}\n")

    return
