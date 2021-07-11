import numpy as np
from PIL import Image
from cv2 import cv2

from typing import List, Union
from fastapi.datastructures import UploadFile
from starlette.responses import JSONResponse
import numpy as np

from io import BytesIO

VALID_IMAGE_FILETYPES = ["jpeg", "png", "jpg"]


def _read_image(file) -> Image.Image:
    image = Image.open(BytesIO(file))
    return image


def _is_filetype_valid(filename: str) -> bool:
    if filename.split(".")[-1] in VALID_IMAGE_FILETYPES:
        return True
    else:
        return False


def _read_image_cv2(data):
    npimg = np.frombuffer(data, np.uint8)
    frame = cv2.imdecode(npimg, cv2.IMREAD_COLOR)
    cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    return frame


async def preprocess_images(
    files: List[UploadFile],
) -> Union[List[np.ndarray], JSONResponse]:
    """
    Converts images to numpy array and check
    for validity
    """
    images = []

    for image in files:
        if _is_filetype_valid(image.filename):
            image = _read_image_cv2(await image.read())
            images.append(image)
        else:
            return JSONResponse(status_code=500, content="invalid filetypes")

    return images
