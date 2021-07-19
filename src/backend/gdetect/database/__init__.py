"""
Module for interacting with the sql database
"""
from .Database import User, Result, session
from .methods import query_all_vector_embeddings, convert_status
