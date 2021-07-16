import os
import numpy as np
import uuid


class Database:
    def __init__(self, path: str):
        self._path = path
        return

    def __iter__(self):
        """
        Iterate through all the vector embeddings
        in the database
        """
        for file in os.listdir(self._path):
            if file.endswith("npy"):
                vector_embedding = np.load(file)
                yield vector_embedding

    def save_array(self, array: np.ndarray) -> None:
        """
        Saves numpy array to the database
        """
        name = str(uuid.uuid1())
        np.save(name, array)
        return
