from gdetect.utils import config


@config.link(option="guards.file_type_verification")
def verify_filetype(filename: str, valid_filetypes=["jpeg", "png", "jpg"]) -> bool:
    """
    Helper function which determines the filetype of
    a file based on it's filename

    valid filetypes = ["jpeg", "png", "jpg"]

    Parameters:
        filename (str)

    Returns:
        True if filetype is valid
    """
    if filename.split(".")[-1] in valid_filetypes:
        return True
    else:
        return False
