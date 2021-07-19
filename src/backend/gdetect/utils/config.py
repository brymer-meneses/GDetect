from ..config import CONFIG


def getvalue(option: str):
    try:
        value = CONFIG["values"][option]
    except KeyError:
        raise KeyError("Invalid Option")
    return value


def enabled(option: str):
    """
    Helper function to dynamically turn off certain
        features of the GDetect verification process
    """
    family, setting = option.split(".")

    try:
        is_setting_enabled = CONFIG[family][setting]
    except KeyError:
        raise KeyError("Invalid Option")

    return is_setting_enabled
