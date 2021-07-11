"""
Utility functions for API

"""


from io import BytesIO
from PIL import Image

VALID_IMAGE_FILETYPES = ["jpeg", "png", "jpg"]


def read_image(file) -> Image.Image:
    image = Image.open(BytesIO(file))
    return image


def is_filetype_valid(filename: str) -> bool:
    if filename.split(".")[-1] in VALID_IMAGE_FILETYPES:
        return True
    else:
        return False
