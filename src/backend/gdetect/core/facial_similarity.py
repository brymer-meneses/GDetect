from deepface import DeepFace

from gdetect.utils import read_image_cv2, config
from gdetect.database import Task
from gdetect.utils.logger import logger
from .base import BaseMethod


class FacialSimilarity(BaseMethod):
    @property
    def _config_name(self) -> str:
        return "facial_similarity_detection"

    def __init__(self, task: Task) -> None:
        super().__init__()
        self._task = task
        self._model_name = config.get(self._config_name, "model")
        self._tolerance = config.get(self._config_name, "tolerance")
        return

    def run(self, img1: bytes, img2: bytes) -> None:
        """
        Computes the facial similarity between two images
        """

        if not self.enabled:
            logger.info("[ Skipping ]: Facial Similarity not enabled\n")
        if self.enabled:
            logger.info("[ Started ]: Performing Facial Similarity Detection")
            result = DeepFace.verify(
                read_image_cv2(img1),
                read_image_cv2(img2),
                model_name=self._model_name,
            )
            passed_facial_similarity = result["distance"] < self._tolerance

            if passed_facial_similarity:
                logger.info("[ Success ]: Passed Facial Similarity Detection\n")
                self.success = True
            else:
                self.success = False
                logger.info(
                    "[ Failed ]: Images uploaded doesn't have the same facial structure\n"
                )
                self._task.add_new_failure(status=4)
        return
