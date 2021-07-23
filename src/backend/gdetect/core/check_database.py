from typing import List
from scipy.spatial import distance

from gdetect.database import query_all_vector_embeddings
from gdetect.utils import config


def check_database(input_embedding: List):
    embeddings = query_all_vector_embeddings()

    metric = config.getvalue("facial_similarity_metric")

    top = None
    for embedding in embeddings:
        if metric == "cosine":
            result = distance.cosine(embedding, input_embedding)
        elif metric == "euclidean":
            result = distance.euclidean(embedding, input_embedding)
        else:
            print("Invalid Metric 'facial_similarity_metric', defaulting to cosine... ")
            result = distance.cosine(embedding, input_embedding)

        if top is None:
            top = result
        else:
            if top > result:  # type: ignore
                top = result

    return top
