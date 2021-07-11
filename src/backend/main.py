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


from utils import preprocess_images
from gdetect.facial_recognition import validate_faces, compute_facial_similarity


@app.post("/api/upload-images")
async def process_images(files: List[UploadFile] = File(...)):
    """ This function will run the core GDetect algorithm """

    images = await preprocess_images(files)
    if not validate_faces(images):  # type : ignore
        return JSONResponse(
            status_code=500,
            content="Image Error. Please retake your images.",
        )
    if compute_facial_similarity(images[0], images[1]) > 0.40:  # type: ignore
        return JSONResponse(status_code=500, content="Verification Failed")
    else:
        return JSONResponse(status_code=200, content="Verification Success")
