import tensorflow as tf
import numpy as np
from gdetect.utils import read_image_pil


def classify_id(img: bytes) -> bool:
    image = np.array(read_image_pil(img))
    normalized_image = image / 255

    return True
