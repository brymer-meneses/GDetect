import numpy as np
from deepface import DeepFace


from utils import read_image_cv2
from database import Database

from scipy.spatial.distance import cosine

MODELS = ["VGG-Face", "Facenet", "OpenFace", "DeepFace", "DeepID", "ArcFace", "Dlib"]
DATABASE_PATH = r"database/face_vectors"

db = Database(path=DATABASE_PATH)


def compute_facial_similarity(img1: bytes, img2: bytes):
    """
    Computes the facial similarity between two images
    """

    img1, img2 = read_image_cv2(img1), read_image_cv2(img2)

    result = DeepFace.verify(img1, img2, model_name=MODELS[1])
    return result["distance"]


def check_database(img: np.ndarray):

    input_embedding = DeepFace.represent(img, model_name=MODELS[1])

    for embedding in db:
        # TODO: Implement this
        # cosine_similarity = 1 - float(cosine(embedding, embedding))
        pass
    return
