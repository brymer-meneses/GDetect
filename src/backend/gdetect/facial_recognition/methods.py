from typing import List, Tuple, Union
import numpy as np
from mtcnn import MTCNN
from starlette.responses import JSONResponse

detector = MTCNN()


def validate_faces(imgs: List[np.ndarray]) -> bool:
    """
    Calculate the number of faces that the
    user sent to the system
    """

    number_of_faces = 0
    for img in imgs:
        faces = detector.detect_faces(img)
        number_of_faces += len(faces)

    if number_of_faces > 1:
        return True
    else:
        return False


def crop_faces(img: np.ndarray) -> Tuple[int, List[np.ndarray]]:
    """
    Detects and crops the face/s that exist/s in the input image.
    """

    # Detect the faces in an image
    faces = detector.detect_faces(img)

    cropped_imgs = []
    number_of_faces = 0
    for face in faces:
        box = face["box"]
        x, y, w, h = box
        cropped_img = img[y : y + h, x : x + w]
        cropped_imgs.append(cropped_img)
        number_of_faces += 1

    return number_of_faces, cropped_imgs
