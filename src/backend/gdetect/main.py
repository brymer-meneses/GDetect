"""
Runs the main GDetect Algorithm
"""


from gdetect.guards import verify_idinfo, verify_pictures
from gdetect.core import compute_facial_similarity
from gdetect.database import session, Result
from gdetect.utils import config

from typing import Dict


def compute_fraudulence_score(probs: Dict[str, float]) -> float:

    return 0.0


def process_information(
    selfie_image: bytes,
    id_image: bytes,
    full_name: str,
    email_address: str,
):
    # task = Result(email=email_address, verification_status=2)
    # session.add(task)
    # session.commit()

    passed_id_info_validation = config.enabled(
        "guards.id_info_validation"
    ) and not verify_idinfo(full_name, id_image)

    passed_face_detection = config.enabled(
        "guards.face_detection"
    ) and not verify_pictures([selfie_image, id_image])

    proceed_to_core_validation = passed_id_info_validation and passed_face_detection

    if proceed_to_core_validation:
        probs = {}

        if config.enabled("core.facial_similarity_detection"):
            probs["facial_similarity"] = compute_facial_similarity(
                id_image, selfie_image
            )
            print(probs["facial_similarity"])
        if config.enabled("core.image_forgery_detection"):
            # probs["image_forgery_detection"]
            pass

        if config.enabled("core.image_cg_detection"):
            # probs["image_forgery_detection"]
            pass

    # session.delete(task)
    # session.commit()

    return
