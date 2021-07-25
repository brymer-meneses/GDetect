MODELS = ["VGG-Face", "Facenet", "OpenFace", "DeepFace", "DeepID", "ArcFace", "Dlib"]
METRICS = ["cosine", "euclidean"]


CONFIG = {
    # Guards
    "file_type_verification": {"enabled": True},
    "face_detection": {"enabled": True},
    "id_info_validation": {"enabled": True},
    # Core
    "facial_similarity_detection": {
        "enabled": True,
        "tolerance": 0.40,
        "model": MODELS[1],
        "metric": METRICS[0],
    },
    "database_checking": {
        "enabled": True,
        "selfie_similarity_tolerance": 0.40,
        "id_similarity_tolerance": 0.40,
        "model": MODELS[1],
        "metric": METRICS[0],
    },
    "id_type_validation": {"enabled": True, "tolerance": 0.10},
    "use_gpu": True,
}
