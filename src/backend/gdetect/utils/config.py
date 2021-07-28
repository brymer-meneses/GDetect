from ..config import CONFIG
from typing import List


def get(family: str, option: str):
    try:
        value = CONFIG[family][option]
    except KeyError:
        raise KeyError("Invalid Option")
    return value


def enabled(family: str) -> bool:
    """
    Helper function to dynamically turn off certain
        features of the GDetect verification process
    """

    try:
        is_setting_enabled = CONFIG[family]["enabled"]
    except KeyError:
        raise KeyError("Invalid Config Option")

    return is_setting_enabled


def get_messages(failures: List[int]) -> List[str]:
    """Helper function that converts verification status codes to string"""
    conversion = CONFIG["messages"]

    result = []

    for failure in failures:

        if not failure in range(0, 8):
            raise ValueError("Invalid Status Code")

        result.append(conversion[failure])

    return result
