from tensorflow.keras.models import load_model

import tensorflow_hub as hub

import numpy as np
from gdetect.utils import read_image_pil, config
from gdetect.core.base import BaseMethod
from gdetect.utils.logger import logger
from gdetect.database import Task


class IdValidation(BaseMethod):
    def __init__(self, task: Task) -> None:
        super().__init__(config_name="id_validation")
        self._task = task
        self._labels = {
            0: "DRIVERS_LICENSE",
            1: "INVALID",
            2: "NATIONAL ID",
            3: "PASSPORT",
            4: "PHILHEALTH",
            5: "SSS",
            6: "VOTER_S ID",
        }

        return

    def run(self, id_img: bytes) -> None:
        """
        Makes sure that 2 faces are
        detected by the system.
        """
        if not self.enabled:
            logger.info("[ Skipping ]: ID Type Validation not enabled.\n")
        if self.enabled:
            logger.info("[ Started ]: ID Type Validation")
            raw_img = read_image_pil(id_img)
            height, width = config.get("id_validation", "image_dims")
            raw_img = raw_img.resize(size=(height, width))

            image = np.array(raw_img)
            normalized_image = image / 255

            final_image = np.reshape(normalized_image, (1, height, width, 3))

            logger.debug("Initializing Model")
            model_path = config.get("id_validation", "model_path")
            model = load_model(
                model_path, custom_objects={"KerasLayer": hub.KerasLayer}
            )
            logger.debug("Successfully initialized model.")

            logger.debug("Running model inference")
            result = model.predict(final_image)  # type: ignore
            self._prediction = self._labels[np.argmax(result)]

            logger.debug(f"Prediction: {self._prediction}")
            if self._prediction == "INVALID":
                self._task.add_new_failure(status=5)
                logger.info("[ Failed ]: ID Type Validation\n")
            else:
                logger.info("[ Success ]: ID Type Validation\n")

        return
