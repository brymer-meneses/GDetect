MODELS = ["VGG-Face", "Facenet", "OpenFace", "DeepFace", "DeepID", "ArcFace", "Dlib"]
METRICS = ["cosine", "euclidean"]


CONFIG = {
    # Guards
    "file_type_verification": {"enabled": True},
    "face_detection": {"enabled": True},
    # FIX: ID Info Validation doesn't work properly
    "id_info_validation": {"enabled": False},
    # Core
    "facial_similarity_detection": {
        "enabled": True,
        "tolerance": 0.40,
        "model": MODELS[1],
        "metric": METRICS[0],
    },
    # FIX: database checking doesn't work
    "database_checking": {
        "enabled": True,
        "tolerance": 0.40,
        "model": MODELS[1],
        "metric": METRICS[0],
    },
    # TODO: implement id type validation
    "id_type_validation": {"enabled": True, "tolerance": 0.10},
    "use_gpu": True,
}


"""
    Verification Status:

   -1   - User verification process was finished but failed
    0   - User Verification Success
    1   - User did not do any prior attempt
         to verification
    2   - User verification is currently being processed

    Error Codes:

    3   - Faces were not detected by the system
    4   - The two images that were uploaded, did not have
        the same facial structure.
    5   - Invalid ID
    6   - Credentials don't match up with the ones written
        in the id uploaded by the user.
    7   - A similar facial structure has been found in the database
"""
