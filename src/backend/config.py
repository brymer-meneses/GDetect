CONFIG = {
    "weights": {
        "id_info_verification": 0.25,
        "facial_similarity": 0.25,
        "id_validation": 0.25,
        "image_forgery": 0.25,
    },
    "enabled": {
        "image_forgery",
        "facial_similarity",
        "id_validation",
        "image_forgery",
    },
}


#  TODO: Create a wrapper for this function
def is_enabled(method: str) -> bool:
    if method in CONFIG["enabled"]:
        return True
    return False
