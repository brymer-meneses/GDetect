MODELS = ["VGG-Face", "Facenet", "OpenFace", "DeepFace", "DeepID", "ArcFace", "Dlib"]

CONFIG = {
    # Weights for computing the overall fraudulence score
    "weights": {
        "id_info_verification": 0.25,
        "facial_similarity": 0.25,
        "id_validation": 0.25,
        "image_forgery": 0.25,
    },
    "core": {
        "image_forgery_detection": True,
        "facial_similarity_detection": True,
        "image_cg_detection": True,
    },
    "guards": {
        "file_type_verification": True,
        "face_detection": True,
        "id_info_validation": True,
    },
    "values": {
        "facial_similarity_tolerance": 0.40,
        "facial_similarity_model": MODELS[1],
    },
}
