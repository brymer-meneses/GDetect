from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from typing import List
from starlette.responses import JSONResponse

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def index():
    return {"message", "This is the GDetect API"}


from utils.image import convert_image_to_cv2
from utils.api import is_filetype_valid, read_image
from cv2 import cv2
import numpy as np

from gdetect.facial_similarity import crop_faces


@app.post("/api/upload-images")
async def process_images(files: List[UploadFile] = File(...)):
    """ This function will run the core GDetect algorithm """

    images = []
    for image in files:
        if is_filetype_valid(image.filename):
            image = read_image(await image.read())
            images.append(image)
        else:
            return JSONResponse(status_code=500, content="invalid filetypes")

    # ---------------------------------------------------
    # Compute Facial Similarity between the id and selfie
    for image in images:
        cv2_image = convert_image_to_cv2(image)
        # Crops the faces in an image
        number_of_faces, cropped_faces = crop_faces(cv2_image)
        if number_of_faces == 0:
            return JSONResponse(
                status_code=500,
                content="no faces were detected by the system, make, please retake your image",
            )
        else:
            # Run the tensorflow model
            # Generate vector embeddings
            # Check if vector embedding is similar to other pictrues
            cv2.imshow("cropped image", cropped_faces[0])
            cv2.waitKey(0)
    # ---------------------------------------------------

    # 1. Test for image forgery
    # 2. Test if image is computer generated

    return {
        "filenames": [image.filename for image in files],
    }
