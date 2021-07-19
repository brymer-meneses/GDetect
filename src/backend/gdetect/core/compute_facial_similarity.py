import numpy as np
from deepface import DeepFace


from gdetect.utils import read_image_cv2, config


from scipy.spatial.distance import cosine


def compute_facial_similarity(img1: bytes, img2: bytes) -> bool:
    """
    Computes the facial similarity between two images
    """

    img1, img2 = read_image_cv2(img1), read_image_cv2(img2)

    result = DeepFace.verify(
        img1, img2, model_name=config.getvalue("facial_similarity_model")
    )
    return result["distance"]


# def check_database(img: np.ndarray):

#     input_embedding = DeepFace.represent(img, model_name=MODELS[1])

#     for embedding in db:
#         # TODO: Implement this
#         # cosine_similarity = 1 - float(cosine(embedding, embedding))
#         pass
#     return
