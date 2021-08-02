from abc import abstractmethod, ABC

from gdetect.utils import config


class BaseMethod(ABC):
    def __init__(self, config_name: str):
        self._config_name = config_name
        self.enabled = config.enabled(family=self._config_name) and config.enabled(
            "system"
        )
        return

    @abstractmethod
    def run(self) -> None:
        """ function to be called for running the method """
        raise NotImplementedError
