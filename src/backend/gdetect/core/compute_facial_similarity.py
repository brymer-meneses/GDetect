import numpy as np
from deepface import DeepFace
from scipy.spatial.distance import cosine

from gdetect.utils import read_image_cv2, config


def compute_facial_similarity(img1: bytes, img2: bytes) -> bool:
    """
    Computes the facial similarity between two images
    """

    img1, img2 = read_image_cv2(img1), read_image_cv2(img2)

    model_name = config.getvalue("facial_similarity_model")
    result = DeepFace.verify(img1, img2, model_name=model_name)
    return result["distance"]
