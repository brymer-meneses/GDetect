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
):

    try:
        task = Task(email=email_address, verification_status=2)
    except ValueError as err:
        print(err)
        return

    session.add(task)
    session.commit()

    passed_id_info_validation = config.enabled("id_info_validation") and verify_idinfo(
        full_name, id_image
    )
    passed_face_detection = config.enabled("face_detection") and verify_pictures(
        [selfie_image, id_image]
    )

    """
    Verification Status Codes:
        0 - User Verification Success
        1 - User did not do any prior attempt
             to verification
        2 - User verification is currently being processed
        3 - Faces were not detected by the system
        4 - The two images that were uploaded, do not have
            the same facial structure.
        5 - Invalid ID
        6 - Credentials don't match up with the ones written
            in the id uploaded by the user.
        7 - A similar facial structure has been found in the database
    """
    if not passed_id_info_validation:
        task.end(status=6)
        return

    if not passed_face_detection:
        task.end(status=3)
        return

    selfie_embedding = None
    id_embedding = None

    if config.enabled("database_checking"):
        selfie_embedding = generate_embedding(selfie_image)
        id_embedding = generate_embedding(id_image)

        passed_database_selfie_similarity_checking = database_checking(selfie_input_embedding)  # type: ignore
        passed_database_id_similarity_checking = database_checking(id_input_embedding)  # type: ignore

        if (
            not passed_database_id_similarity_checking
            and not passed_database_selfie_similarity_checking
        ):
            task.end(status=7)
            return

    if config.enabled("facial_similarity_detection"):

        passed_facial_similarity_detection = compute_facial_similarity(  # type: ignore
            id_image, selfie_image
        )

        if not passed_facial_similarity_detection:
            task.end(status=4)
            return

    if config.enabled("id_type_validation"):
        passed_id_type_validation = True
        if not passed_id_type_validation:
            task.end(status=5)
            return

    add_user_to_database(
        email=email_address,
        full_name=full_name,
        selfie_vector_embedding=selfie_embedding,  # type: ignore
        id_vector_embedding=id_embedding,  # type: ignore
    )

    return
