MODELS = ["VGG-Face", "Facenet", "OpenFace", "DeepFace", "DeepID", "ArcFace", "Dlib"]
METRICS = ["cosine", "euclidean"]


CONFIG = {
    # Weights for computing the overall fraudulence score
    "minimum_probabilites": {
        "facial_similarity_detection": 0.40,
        "selfie_facial_similarity_database_checking": 0.40,
        "id_facial_similarity_database_checking": 0.40,
        "id_type_validation": 0.90,
    },
    "core": {
        "image_forgery_detection": True,
        "facial_similarity_detection": True,
        "facial_similarity_database_checking": True,
    },
    "guards": {
        "file_type_verification": True,
        "face_detection": True,
        "id_info_validation": True,
    },
    "values": {
        "facial_similarity_tolerance": 0.40,
        "facial_similarity_model": MODELS[1],
        "facial_similarity_metric": METRICS[0],
        "minimum_fraudulence_score": 0.0,
    },
}
