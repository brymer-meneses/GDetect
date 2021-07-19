import numpy as np
from PIL import Image
from cv2 import cv2

import numpy as np

from io import BytesIO


def read_image_pil(file) -> Image.Image:
    """ Read image in PIL Format """

    image = Image.open(BytesIO(file))
    return image


def read_image_cv2(data) -> np.ndarray:
    """ Read image in cv2 Format """
    npimg = np.frombuffer(data, np.uint8)
    frame = cv2.imdecode(npimg, cv2.IMREAD_COLOR)
    cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    return frame
