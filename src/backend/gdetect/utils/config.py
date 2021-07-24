from ..config import CONFIG


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
        raise KeyError("Invalid Option")

    return is_setting_enabled
