from typing import List
from mtcnn import MTCNN

from gdetect.utils import read_image_cv2
from gdetect.config import CONFIG
from gdetect.database import session, User, Task

import easyocr

detector = MTCNN()


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


def verify_idinfo(text: str, raw_img) -> bool:

    reader = easyocr.Reader(lang_list=["en"], gpu=False)
    result = reader.readtext(raw_img)

    print(result)
    if text in result:
        return True
    else:
        return False


def verify_pictures(imgs: List[bytes]) -> bool:
    """
    Calculate the number of faces that the
    user sent to the system.
    If it is less than two it returns false
    """

    number_of_faces = 0
    for img in imgs:
        img = read_image_cv2(img)
        faces = detector.detect_faces(img)
        number_of_faces += len(faces)

    if number_of_faces > 1:
        return True
    else:
        return False
