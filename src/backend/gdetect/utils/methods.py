import numpy as np
from PIL import Image
from cv2 import cv2
from io import BytesIO

from typing import List
from deepface import DeepFace
from gdetect.utils import config


def read_image_pil(file) -> Image.Image:
    """ Read image in PIL Format """

    image = Image.open(BytesIO(file))
    return image


def read_image_cv2(data) -> np.ndarray:
    """ Read image in cv2 Format """
    npimg = np.frombuffer(data, np.uint8)
    frame = cv2.imdecode(npimg, cv2.IMREAD_COLOR)
    cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    return frame


def generate_embedding(img: bytes) -> List[float]:

    model = config.get("facial_similarity_detection", "model")
    embedding = DeepFace.represent(read_image_cv2(img), model_name=model)
    return embedding


def get_messages(failures: List[int]) -> List[str]:
    """ helper function that converts verification status codes to string """
    conversion = {
        0: "Verification Success",
        1: "User did not do any prior attempt to verification",
        2: "Verification currently being processed",
        3: "Faces were not detected by the system",
        4: "The two images that were uploaded, did not have the same facial structure.",
        5: "Invalid ID or ID type not supported for verification",
        6: "Credentials don't match up with the ones written in the id uploaded by the user.",
        7: "A similar facial structure has been found in the database",
    }

    result = []

    for failure in failures:

        if not failure in range(0, 8):
            raise ValueError("Invalid Status Code")

        result.append(conversion[failure])

    return result


def verify_filetype(filename: str, valid_filetypes=["jpeg", "png", "jpg"]) -> bool:
    """
    Helper function which determines the filetype of
    a file based on it's filename

    valid filetypes = ["jpeg", "png", "jpg"]

    Parameters:
        filename (str)

    Returns:
        True if filetype is valid
    """
    if filename.split(".")[-1] in valid_filetypes:
        return True
    else:
        return False
