import numpy as np
from deepface import DeepFace


MODELS = ["VGG-Face", "Facenet", "OpenFace", "DeepFace", "DeepID", "ArcFace", "Dlib"]
DATABASE = r"database"


def compute_facial_similarity(img1: np.ndarray, img2: np.ndarray):
    """ Computes the facial similarity between two images """

    result = DeepFace.verify(img1, img2, model_name=MODELS[1])
    return result["distance"]


def check_database(img: np.ndarray):
    df = DeepFace.find(img_path=img, model_name=MODELS[1], db_path=DATABASE)
    return df
