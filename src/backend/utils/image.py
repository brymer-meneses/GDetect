import numpy as np
from PIL import Image
from cv2 import cv2


def convert_image_to_cv2(img: Image) -> np.ndarray:
    """
    Converts PIL Image to cv2 format.
    """
    cvImage = cv2.cvtColor(np.array(img), cv2.COLOR_RGB2BGR)
    return cvImage
