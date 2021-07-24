from typing import List
from scipy.spatial import distance

from gdetect.database import query_all_vector_embeddings
from gdetect.utils import config


def database_checking(input_embedding: List) -> bool:
    embeddings = query_all_vector_embeddings()

    metric = config.get(family="facial_similarity", option="metric")

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

    passed_database_checking = top < config.get("database_checking", "tolerance")
    return passed_database_checking
