from typing import Callable, List
from scipy.spatial import distance

from gdetect.database import query_all_vector_embeddings
from gdetect.utils import config


def database_checking(input_embedding: List) -> bool:
    embeddings = query_all_vector_embeddings()

    metric = config.get(family="facial_similarity_detection", option="metric")

    func: Callable
    if metric == "cosine":
        func = distance.cosine
    elif metric == "euclidean":
        func = distance.euclidean
    else:
        print("Invalid Metric 'facial_similarity_metric', defaulting to cosine... ")
        func = distance.cosine

    distances = []
    for id_embedding, selfie_embedding in embeddings:
        id_result = func(id_embedding, input_embedding)
        selfie_result = func(selfie_embedding, input_embedding)

        distances.append(id_result)
        distances.append(selfie_result)

    if len(distances) == 0:
        return True

    distances.sort(reverse=False)
    top = distances[0]

    passed_database_checking = top < config.get("database_checking", "tolerance")
    return passed_database_checking
