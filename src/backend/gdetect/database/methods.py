from .Database import User, session
from typing import List


def query_all_vector_embeddings(session=session):
    users = session.query(User).all()
    for user in users:
        if user.vector_embedding is not None:
            yield user.vector_embedding


# TODO: Fix this
def convert_status(status: int):
    """ helper function that converts verification status codes to string """
    conversion = {
        0: "User Verification Success",
        1: "User did not do any prior attempt to verification",
        2: "User verification, currently being processed",
        3: "Faces were not detected by the system",
        4: "The two images that were uploaded, did not have the same facial structure.",
        5: "Invalid ID",
        6: "Credentials don't match up with the ones written in the id uploaded by the user.",
    }
    if not status in range(0, 7):
        raise ValueError("Invalid Status Code")

    return conversion[status]


def add_user_to_database(
    email: str,
    full_name: str,
    selfie_vector_embedding: List[float],
    id_vector_embedding: List[float],
):
    user = User(
        email=email,
        full_name=full_name,
        verified=True,
        selfie_vector_embedding=selfie_vector_embedding,
        id_vector_embedding=id_vector_embedding,
    )
    session.add(user)
    session.commit()
