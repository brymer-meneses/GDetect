

from io import BytesIO
from PIL import Image

def read_image(file) -> Image.Image:
    image = Image.open(BytesIO(file))
    return image

VALID_IMAGE_FILETYPES = ["jpeg", "png", "jpg"]

def is_filetype_valid(filename: str) -> bool:
    if filename.split(".")[-1] in VALID_IMAGE_FILETYPES:
        return True
    else:
        return False

    
    
