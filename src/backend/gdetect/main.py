"""
Runs the main GDetect Algorithm
"""
from gdetect.utils.methods import generate_embedding
from gdetect.core.id_validation import IdValidation
import os

# Removes tensorflow logs
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "3"

from typing import Union, List
from gdetect.database import session, Task
from gdetect.database.methods import add_user_to_database

from gdetect.utils.logger import logger
from gdetect.core import (
    DatabaseChecking,
    FacialSimilarity,
    FaceDetection,
    InfoValidation,
)


def process_information(
    selfie_image: bytes,
    id_image: bytes,
    full_name: str,
    email_address: str,
    retry_verification: bool,
):
    # For Debugging
    # retry_verification = True

    task = _init_task(
        email=email_address, full_name=full_name, retry_verification=retry_verification
    )
    if task is None:
        return

    face_detection = FaceDetection(task=task)
    face_detection.run(selfie_image, id_image)

    info_validation = InfoValidation(task=task)
    info_validation.run(id_img=id_image, text=full_name)

    facial_similarity = FacialSimilarity(task=task)
    facial_similarity.run(id_image, selfie_image)

    id_validation = IdValidation(task=task)
    id_validation.run(id_img=id_image)

    selfie_embedding = generate_embedding(selfie_image)
    id_embedding = generate_embedding(id_image)

    database_checking = DatabaseChecking(task=task)
    database_checking.run(selfie_embedding, id_embedding)

    _end_task(
        task=task,
        email=email_address,
        full_name=full_name,
        selfie_embedding=selfie_embedding,
        id_embedding=id_embedding,
    )

    return


def _init_task(
    email: str, full_name: str, retry_verification: bool
) -> Union[Task, None]:

    logger.info(
        f"[ Started ]: Task \n\t\
        Email: {email}, \n\t\
        Full Name: {full_name}"
    )
    logger.debug(f"Retry Verification: {retry_verification}")

    try:
        if not retry_verification:
            task = Task(email=email)

            session.add(task)
        else:
            task = session.query(Task).filter(Task.email == email).one_or_none()
            if task is None:
                logger.warning(
                    f"Retry Verification is set to True but the email: {email} was not found in the database."
                )
            else:
                task.reset()

        session.commit()
        return task
    except ValueError as err:
        logger.warning(err)
        logger.warning(
            "retry_verification is set to False, that's why database overwriting is not allowed."
        )
        return


def _end_task(
    task: Task,
    email: str,
    full_name: str,
    selfie_embedding: List[float],
    id_embedding: List[float],
) -> None:

    passed_verification = len(task.verification_failures) == 0
    logger.info(f"Verification {'Success' if passed_verification else 'Failed'} ")
    if passed_verification:
        logger.debug("Adding User to database")
        add_user_to_database(
            email=email,
            full_name=full_name,
            selfie_vector_embedding=selfie_embedding,
            id_vector_embedding=id_embedding,
        )
        task.success()

    logger.info(f"Finished processing email: {email}\n")

    return
