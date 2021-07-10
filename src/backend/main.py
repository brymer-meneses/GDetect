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

from cv2 import cv2
import numpy as np


@app.get("/")
async def index():
    return {"message", "This is the GDetect API"}


class UploadResponse(BaseModel):
    filenames: str
    # dimensions: str


from utils import read_image, is_filetype_valid


@app.post("/api/upload-images")
async def process_images(files: List[UploadFile] = File(...)):
    """ This function will run the core GDetect algorithm """

    print("received images")
    # images = []
    # for image in files:
    #     if is_filetype_valid(image.filename):
    #         return JSONResponse(
    #             status_code=404, content="Invalid Filetype expected (jpeg, jpg, png)"
    #         )
    #     images.append(read_image(await image.read()))

    # selfie_img, id_img = images

    return {
        "filenames": [image.filename for image in files],
    }
