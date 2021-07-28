from abc import abstractmethod, abstractproperty, ABC

from gdetect.utils import config


class BaseMethod(ABC):
    @abstractproperty
    def _config_name(self) -> str:
        """ Needs to be configured during initiation to be used internally """
        raise NotImplementedError

    @abstractmethod
    def run(self) -> None:
        """ function to be called for running the method """
        raise NotImplementedError

    @property
    def enabled(self) -> bool:
        is_enabled = config.enabled(family=self._config_name)
        return is_enabled
