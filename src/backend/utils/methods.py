import numpy as np
from PIL import Image
from cv2 import cv2

import numpy as np

from io import BytesIO


def read_image_pil(file) -> Image.Image:
    """ Read image in PIL Format """

    image = Image.open(BytesIO(file))
    return image


def is_filetype_valid(filename: str, valid_filetypes=["jpeg", "png", "jpg"]) -> bool:
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


def read_image_cv2(data) -> np.ndarray:
    """ Read image in cv2 Format """
    npimg = np.frombuffer(data, np.uint8)
    frame = cv2.imdecode(npimg, cv2.IMREAD_COLOR)
    cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    return frame
