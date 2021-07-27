"""
Runs the main GDetect Algorithm
"""


from gdetect.guards import verify_idinfo, verify_pictures
from gdetect.core import compute_facial_similarity, database_checking
from gdetect.database import session, Task
from gdetect.database.methods import add_user_to_database

from gdetect.utils import config, generate_embedding


def process_information(
    selfie_image: bytes,
    id_image: bytes,
    full_name: str,
    email_address: str,
    retry_verification: bool,
):

    print(f"Processing email: {email_address}")
    print(f"\tFull Name: {full_name}")
    print(f"\tRetry Verification: {retry_verification}")

    try:
        if not retry_verification:
            task = Task(
                email=email_address,
            )
        else:
            task = session.query(Task).filter(Task.email == email_address).one()
            task.reset()
    except ValueError as err:
        print(err)
        return

    session.add(task)
    session.commit()

    failures_count = 0

    print(">>> Validating ID Information")
    if config.enabled("id_info_validation"):
        passed_id_info_validation = verify_idinfo(full_name, id_image)

        if not passed_id_info_validation:
            print("\t>>> FAILED")
            task.add_new_failure(status=6)
            failures_count += 1
            return
        else:
            print("\t>>> SUCCESS")
    else:
        print("\t>>> SKIPPING")

    print(">>> Detecting Faces")
    if config.enabled("face_detection"):
        passed_face_detection = verify_pictures([selfie_image, id_image])
        if not passed_face_detection:
            print(">>>\tFAILED")
            task.add_new_failure(status=3)
            failures_count += 1
            return
        else:
            print("\t>>> SUCCESS")
    else:
        print("\t>>> SKIPPING")

    selfie_embedding = None
    id_embedding = None

    print(">>> Performing Database Checking")
    if config.enabled("database_checking"):
        selfie_embedding = generate_embedding(selfie_image)
        id_embedding = generate_embedding(id_image)

        passed_database_selfie_similarity_checking = database_checking(selfie_embedding)
        passed_database_id_similarity_checking = database_checking(id_embedding)

        if (
            not passed_database_id_similarity_checking
            and not passed_database_selfie_similarity_checking
        ):
            task.add_new_failure(status=7)
            failures_count += 1
            return

    print(">>> Performing Facial Similarity Detection")
    if config.enabled("facial_similarity_detection"):

        passed_facial_similarity_detection = compute_facial_similarity(  # type: ignore
            id_image, selfie_image
        )

        if not passed_facial_similarity_detection:
            task.add_new_failure(status=4)
            failures_count += 1
            return

    print(">>> Performing ID type validation")
    if config.enabled("id_type_validation"):
        passed_id_type_validation = True
        if not passed_id_type_validation:
            task.add_new_failure(status=5)
            failures_count += 1
            return

    if failures_count == 0:
        add_user_to_database(
            email=email_address,
            full_name=full_name,
            selfie_vector_embedding=selfie_embedding,  # type: ignore
            id_vector_embedding=id_embedding,  # type: ignore
        )
        task.success()
    print(f"Finished processing email: {email_address}")

    return
