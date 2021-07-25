from sqlalchemy.types import TypeDecorator, LargeBinary

import numpy as np
import blosc


class Array(TypeDecorator):
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
