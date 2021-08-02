from deepface import DeepFace

from gdetect.utils import read_image_cv2, config
from gdetect.database import Task
from gdetect.utils.logger import logger
from .base import BaseMethod


class FacialSimilarity(BaseMethod):
    def __init__(self, task: Task) -> None:
        super().__init__(config_name="facial_similarity_detection")
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

            try:
                result = DeepFace.verify(
                    read_image_cv2(img1),
                    read_image_cv2(img2),
                    model_name=self._model_name,
                )
                distance = result["distance"]
                logger.debug(f"Similarity: {distance}")
                passed_facial_similarity = distance < self._tolerance
            except ValueError:
                passed_facial_similarity = None
                logger.info(
                    "[ Failed ]: Unable to run facial similarity checking, no faces detected."
                )
            if passed_facial_similarity is None:
                # If Facial Similarity can't be run,
                # finish the function early.
                return

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
