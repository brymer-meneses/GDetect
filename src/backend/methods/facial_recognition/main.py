import numpy as np
from deepface import DeepFace

import sys


from utils import read_image_cv2

MODELS = ["VGG-Face", "Facenet", "OpenFace", "DeepFace", "DeepID", "ArcFace", "Dlib"]
DATABASE = r"database"


def compute_facial_similarity(img1: bytes, img2: bytes):
    """ Computes the facial similarity between two images """

    img1, img2 = read_image_cv2(img1), read_image_cv2(img2)

    result = DeepFace.verify(img1, img2, model_name=MODELS[1])
    return result["distance"]


def check_database(img: np.ndarray):
    df = DeepFace.find(img_path=img, model_name=MODELS[1], db_path=DATABASE)
    return df
