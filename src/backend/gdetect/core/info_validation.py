from gdetect.utils.logger import logger
from gdetect.utils import config
from gdetect.core.base import BaseMethod
from gdetect.database import Task

import easyocr


class InfoValidation(BaseMethod):
    def __init__(self, task: Task) -> None:
        super().__init__(config_name="info_validation")
        self._task = task
        self._lang_list = config.get(self._config_name, "lang_list")
        self._use_gpu = config.get(self._config_name, "use_gpu")
        return

    def run(self, id_img: bytes, text: str) -> None:
        """
        validates the textual information uploaded by the user, to see
        if it appears on the id
        """

        if not self.enabled:
            logger.info("[ Skipping ]: ID Info validation")

        if self.enabled:
            logger.info("[ Started ]: Validating ID Information")
            reader = easyocr.Reader(self._lang_list, self._use_gpu)
            data = reader.readtext(id_img)
            print(data)
            detected_texts = [text[-2] for text in data]
            logger.debug(f"detected texts: {detected_texts}")

            passed_info_validation = False
            for detected_text in detected_texts:
                if text in detected_text:
                    logger.debug(f"text: {text}")
                    logger.debug(f"found match of {text} -> {detected_text}")
                    passed_info_validation = True

            if passed_info_validation:
                logger.info("[ Success ]: Validating ID Information\n")
                self.success = True
            else:
                logger.info("[ Failed ]: Validating ID Information\n")
                self.success = False
                self._task.add_new_failure(status=6)
        return
