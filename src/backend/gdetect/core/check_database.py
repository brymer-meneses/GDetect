import numpy as np
from deepface import DeepFace
from scipy.spatial import distance

from gdetect.database import query_all_vector_embeddings
from gdetect.utils import config


def check_database(img: np.ndarray):
    embeddings = query_all_vector_embeddings()
    input_embedding = DeepFace.represent(
        img, model_name=config.getvalue("facial_similarity_model")
    )

    #  TODO: Implement selection of metrics
    metric = config.getvalue("facial_similarity_metric")

    top = None
    for embedding in embeddings:
        result = distance.cosine(embedding, input_embedding)
        if top is None:
            top = result
        else:
            if top > result:  # type: ignore
                top = result

    return top
