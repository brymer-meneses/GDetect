from scipy.spatial import distance

from gdetect.database import query_all_vector_embeddings, Task
from gdetect.utils import config, generate_embedding
from gdetect.utils.logger import logger

from gdetect.core.base import BaseMethod


class DatabaseChecking(BaseMethod):
    @property
    def _config_name(self) -> str:
        return "database_checking"

    def __init__(self, task: Task) -> None:
        super().__init__()
        self._task = task
        self._metric = config.get(self._config_name, "metric")
        self._tolerance = config.get(self._config_name, "tolerance")
        return

    def run(self, selfie_img: bytes, id_img: bytes) -> None:
        """
        Checks the database for facial similarities
        """

        if not self.enabled:
            logger.info("[ Skipping ]: Database Checking\n")

        if self.enabled:
            logger.info("[ Started ]: Performing Database Checking")
            embeddings = query_all_vector_embeddings()

            metric = self._metric

            if metric == "cosine":
                func = distance.cosine
            elif metric == "euclidean":
                func = distance.euclidean
            else:
                func = distance.cosine
                logger.warning(
                    "Invalid Metric for 'facial_similarity', defaulting to cosine"
                )

            selfie_input_embedding = generate_embedding(selfie_img)
            id_input_embedding = generate_embedding(id_img)

            # Save input embeddings
            # This will be saved in the database later
            # if verification is successful
            self.embeddings = (selfie_input_embedding, id_input_embedding)

            # logger.debug(f"Input: {id_input_embedding} {selfie_input_embedding}")
            distances = []
            for id_embedding, selfie_embedding in embeddings:
                id_result = func(id_input_embedding, id_embedding)
                selfie_result = func(selfie_input_embedding, selfie_embedding)

                distances.append(id_result)
                distances.append(selfie_result)

            if len(distances) == 0:
                self.success = True
                return

            distances.sort(reverse=False)
            top = distances[0]
            # logger.debug(f"Distances: {distances}")
            logger.debug(f"Top Distance: {top}")

            passed_database_checking = top > self._tolerance
            if passed_database_checking:
                logger.info(
                    "[ Success ]: Similar facial structure has not been found in the database"
                )
                self.success = True
            else:
                logger.info("[ Failed ]: Found similar face in the database")
                self._task.add_new_failure(status=6)

        return
