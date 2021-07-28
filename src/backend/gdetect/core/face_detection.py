from typing import List
from mtcnn import MTCNN

from gdetect.utils import read_image_cv2
from gdetect.utils.logger import logger
from gdetect.core.base import BaseMethod
from gdetect.database import Task


class FaceDetection(BaseMethod):
    @property
    def _config_name(self) -> str:
        return "face_detection"

    def __init__(self, task: Task) -> None:
        super().__init__()
        self._task = task
        self._detector = MTCNN()
        return

    def run(self, selfie_img: bytes, id_img: bytes) -> None:
        """
        Makes sure that 2 faces are
        detected by the system.
        """

        if not self.enabled:
            logger.info("[ Skipping ]: Face Detection - not enabled")
        if self.enabled:
            logger.info("[ Started ]: Face Detection ")
            detector = self._detector

            number_of_faces = 0
            for img in [selfie_img, id_img]:
                img = read_image_cv2(img)
                faces = detector.detect_faces(img)
                number_of_faces += len(faces)
            logger.debug(f"Number of Faces Detected: {number_of_faces}")

            if number_of_faces == 2:
                self.success = True
                logger.info("[ Success ]: Detecting Faces\n")
            else:
                logger.info("[ Failed ]: Detecting Faces\n")
                self._task.add_new_failure(status=3)
                self.success = False
        return
