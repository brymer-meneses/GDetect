"""
GDetect Module for facial recognition
"""

import sys

sys.path.append("..")

from .methods import crop_faces, validate_faces
from .main import compute_facial_similarity
