from typing import List, Tuple
from cv2 import cv2
from PIL.Image import Image
import numpy as np
import os


FACE_CASCADE_FILE = r"gdetect/facial_similarity/haarcascade_frontalface_default.xml"
cascade = cv2.CascadeClassifier(FACE_CASCADE_FILE)


def crop_faces(img: np.ndarray) -> Tuple[int, List[np.ndarray]]:
    """
    Crops the face/s of that exist/s in the input image.
    """

    # Detect the faces in an image
    print(os.getcwd())
    faces = cascade.detectMultiScale(img, 1.3, 5)

    cropped_imgs = []
    number_of_faces = 0
    for face in faces:
        x, y, w, h = face
        cropped_img = img[y : y + h, x : x + w]
        cropped_imgs.append(cropped_img)
        number_of_faces += 1

    return number_of_faces, cropped_imgs
