MODELS = ["VGG-Face", "Facenet", "OpenFace", "DeepFace", "DeepID", "ArcFace", "Dlib"]
METRICS = ["cosine", "euclidean"]


CONFIG = {
    # Guards
    "face_detection": {"enabled": True},
    # FIX: ID Info Validation doesn't work properly
    "info_validation": {"enabled": True, "use_gpu": False, "lang_list": ["en"]},
    # Core
    "facial_similarity_detection": {
        "enabled": True,
        "tolerance": 0.40,
        "model": MODELS[1],
        "metric": METRICS[0],
    },
    "database_checking": {
        "enabled": True,
        "tolerance": 0.40,
        "model": MODELS[1],
        "metric": METRICS[0],
    },
    # TODO: implement id type validation
    "id_validation": {"enabled": True, "tolerance": 0.10},
    "messages": {
        # Verification Status:
        -1: "Verification Failed.",
        0: "Verification Success.",
        1: "No pending verification was linked to this email.",
        2: "Verification is currently being processed.",
        # Error Codes:
        3: "Faces were not detected by the system.",
        4: "The two images that were uploaded, did not have the same facial structure.",
        5: "The type of ID uploaded is not supported.",
        6: "ID Information doesn't match up with the given information.",
        7: "A similar facial structure has been found in the database.",
    },
}
