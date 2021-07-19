from typing import Callable
from ..config import CONFIG


def getvalue(option: str):
    try:
        family, setting = option.split(".")
        value = CONFIG[family][setting]
    except KeyError:
        raise KeyError("Invalid Option")
    return value


def link(option: str):
    """
    Helper function to dynamically turn off certain
        features of the GDetect verification process
    """
    family, setting = option.split(".")

    try:
        is_setting_enabled = CONFIG[family][setting]
    except KeyError:
        raise KeyError("Invalid Option")

    def decorator(method: Callable):
        def wrapper(*args, **kwargs):

            # Don't run the function and return False
            # if is disabled from config.py
            if is_setting_enabled:
                return method(*args, **kwargs)
            else:
                return False

        return wrapper

    return decorator
