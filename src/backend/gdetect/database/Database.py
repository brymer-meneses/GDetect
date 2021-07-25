from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.sql.schema import Column
from sqlalchemy import String, Boolean, Integer

from .types import Array
import numpy as np

engine = create_engine("sqlite:///storage//main.db?check_same_thread=false")
session = sessionmaker(bind=engine)()

Base = declarative_base()


class User(Base):

    __tablename__ = "user"

    email = Column(String, primary_key=True)
    full_name = Column(String)
    verified = Column(Boolean)
    selfie_vector_embedding = Column(Array)
    id_vector_embedding = Column(Array)

    def __init__(
        self,
        email: str,
        full_name: str,
        verified: bool = False,
        selfie_vector_embedding: np.ndarray = None,
        id_vector_embedding: np.ndarray = None,
    ) -> None:
        self.email = email
        self.full_name = full_name
        self.verified = verified
        self.selfie_vector_embedding = selfie_vector_embedding
        self.id_vector_embedding = id_vector_embedding


class Task(Base):
    __tablename__ = "task"

    email = Column(String, primary_key=True)
    verification_status = Column(Integer)
    verification_failures = Column(Array)

    def __init__(self, email: str, verification_status: int) -> None:

        duplicate_task = session.query(Task).filter(Task.email == email).one_or_none()
        if duplicate_task is None:
            self.email = email
            self.verification_status = verification_status
            self.verification_failures = []
        else:
            raise ValueError(
                f"Account associated with email: {email} is currently being processed or is finished."
            )

        return

    def end(self, status: int, session=session) -> None:
        self.verification_status = status
        session.commit()
        return

    def add_new_failure(self, status: int, session=session) -> None:

        if self.verification_status != -1:
            self.verification_status = -1

        self.verification_failures = np.append(self.verification_failures, status)
        session.commit()
        return


Base.metadata.create_all(bind=engine)
