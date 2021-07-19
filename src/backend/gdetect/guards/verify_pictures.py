from typing import List
from mtcnn import MTCNN

from gdetect.utils import read_image_cv2, config


detector = MTCNN()


@config.link(option="guards.face_detection")
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
