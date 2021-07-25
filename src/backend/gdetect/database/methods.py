from .Database import User, session
from typing import List


def query_all_vector_embeddings(session=session):
    users = session.query(User).all()
    for user in users:
        if user.vector_embedding is not None:
            yield user.vector_embedding


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
