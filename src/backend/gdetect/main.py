"""
Runs the main GDetect Algorithm
"""


from gdetect.guards import verify_idinfo, verify_pictures
from gdetect.core import compute_facial_similarity, check_database
from gdetect.database import session, Task
from gdetect.database.methods import add_user_to_database

from gdetect.utils import config, read_image_cv2
from gdetect.utils.config import CONFIG

from typing import Dict

from deepface import DeepFace


def compute_fraudulence_score(probs: Dict[str, float]) -> float:

    minimum_probs = CONFIG["minimum_probabilities"]

    score = 0
    for type, prob in probs.items():
        score += minimum_probs[type] - prob

    return score


def process_information(
    selfie_image: bytes,
    id_image: bytes,
    full_name: str,
    email_address: str,
):
    task = Task(email=email_address, verification_status=2)
    session.add(task)
    session.commit()

    passed_id_info_validation = config.enabled(
        "guards.id_info_validation"
    ) and verify_idinfo(full_name, id_image)

    passed_face_detection = config.enabled("guards.face_detection") and verify_pictures(
        [selfie_image, id_image]
    )

    proceed_to_core_validation = passed_id_info_validation and passed_face_detection

    probs = CONFIG["minimum_probabilities"]
    selfie_input_embedding = []
    id_input_embedding = []
    if proceed_to_core_validation:

        if config.enabled("core.facial_similarity_database_checking"):
            selfie_input_embedding = DeepFace.represent(
                read_image_cv2(selfie_image),
                model_name=config.getvalue("facial_similarity_model"),
            )
            id_input_embedding = DeepFace.represent(
                read_image_cv2(id_image),
                model_name=config.getvalue("facial_similarity_model"),
            )

            probs["selfie_facial_similarity_database_checking"] = check_database(selfie_input_embedding)  # type: ignore
            probs["id_facial_similarity_database_checking"] = check_database(id_input_embedding)  # type: ignore

            print("passed database checking")

        if config.enabled("core.facial_similarity_detection"):
            probs["facial_similarity"] = compute_facial_similarity(  # type: ignore
                id_image, selfie_image
            )

            print("passed fs detection")

        if config.enabled("core.id_type_validation"):
            # probs["image_forgery_detection"]
            pass

    fraudulence_score = compute_fraudulence_score(probs)
    passed_verification = fraudulence_score < config.getvalue(
        "minimum_fraudulence_score"
    )

    if passed_verification:
        add_user_to_database(
            email=email_address,
            full_name=full_name,
            selfie_vector_embedding=selfie_input_embedding,
            id_vector_embedding=id_input_embedding,
        )

    session.delete(task)
    session.commit()

    return
