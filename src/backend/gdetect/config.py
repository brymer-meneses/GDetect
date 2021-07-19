CONFIG = {
    # Weights for computing the overall fraudulence score
    "weights": {
        "id_info_verification": 0.25,
        "facial_similarity": 0.25,
        "id_validation": 0.25,
        "image_forgery": 0.25,
    },
    "core": {
        "image_forgery": True,
        "facial_similarity": True,
        "id_validation": True,
        "image_forgery": True,
    },
    "guards": {
        "file_type_verification": True,
        "face_detection": False,
        "id_info_validation": True,
    },
}
