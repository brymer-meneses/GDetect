from PIL import Image
import easyocr


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


reader = easyocr.Reader(lang_list=["en"], gpu=False)


def verify_idinfo(text: str, raw_img) -> bool:
    result = reader.readtext(raw_img)
    print(result)
    if text in result:
        return True
    else:
        return False
