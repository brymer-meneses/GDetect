from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.sql.schema import Column
from sqlalchemy import String, Boolean, Integer
from sqlalchemy.types import TypeDecorator, LargeBinary

import numpy as np
import blosc


class Ndarray(TypeDecorator):
    impl = LargeBinary

    def process_bind_param(self, value, dialect):
        if value is not None:
            # Serialization of numpy array
            return blosc.pack_array(np.array(value))
        else:
            return None

    def process_result_value(self, value, dialect):
        if value is not None:
            # Deserialization of numpy array
            return blosc.unpack_array(value)
        else:
            return None


engine = create_engine("sqlite:///storage//main.db?check_same_thread=false")
session = sessionmaker(bind=engine)()

Base = declarative_base()


class User(Base):

    __tablename__ = "user"

    email = Column(String, primary_key=True)
    full_name = Column(String)
    verified = Column(Boolean)
    selfie_vector_embedding = Column(Ndarray)
    id_vector_embedding = Column(Ndarray)

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

    def add_to_db(self, session=session) -> None:
        """Adds this object to the database"""
        try:
            session.add(self)
            session.commit()
        except Exception:
            print("Error, duplicate entry")


class Task(Base):
    __tablename__ = "task"

    email = Column(String, primary_key=True)
    verification_status = Column(Integer)

    def __init__(self, email: str, verification_status: int) -> None:

        self.email = email
        self.verification_status = verification_status
        return

    def set_status(self, status: int, session=session) -> None:
        """
        0 - User Verification Success
        1 - User did not do any prior attempt
             to verification
        2 - User verification is currently being processed
        3 - Faces were not detected by the system
        4 - The two images that were uploaded, did not have
            the same facial structure.
        5 - Invalid ID
        6 - Credentials don't match up with the ones written
            in the id uploaded by the user.
        """
        self.verification_status = status
        session.commit()
        return


Base.metadata.create_all(bind=engine)
