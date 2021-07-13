from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware

# from pydantic import BaseModel

# from typing import List
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


from gdetect.facial_recognition import validate_faces, compute_facial_similarity
from gdetect.id_verification import verify_text
from utils import is_filetype_valid


@app.post("/api/upload-images")
async def process_images(
    selfie_image: UploadFile = File(...),
    id_image: UploadFile = File(...),
    full_name: str = Form(...),
    email_address: str = Form(...),
):
    """ This function will run the core GDetect algorithm """

    selfie_image_file = await selfie_image.read()
    id_image_file = await id_image.read()

    ### 1. Validate file being passed to the api,
    ###    returns status code 500 if it isn't

    if not is_filetype_valid(selfie_image.filename):
        return JSONResponse(status_code=500, content="incorrect filetype passed")

    if not is_filetype_valid(id_image.filename):
        return JSONResponse(status_code=500, content="incorrect filetype passed")

    ### 2. Detects texts in the id image and see if it matches
    ###    to the "full_name" given by the user

    if verify_text(full_name, id_image_file):
        return JSONResponse(
            status_code=500, content="Image Error. Please retake your images."
        )

    ### 3. Attempt to detect faces in the uploaded images
    ###    return error otherwise

    if not validate_faces([selfie_image_file, id_image_file]):  # type : ignore
        return JSONResponse(
            status_code=500, content="Image Error. Please retake your images."
        )

    ### 4. Computes the facial similarity of the faces in
    ###    the selfie image and the id image

    if compute_facial_similarity(id_image_file, selfie_image_file) > 0.40:  # type: ignore
        return JSONResponse(status_code=500, content="Verification Failed")
    else:
        return JSONResponse(status_code=200, content="Verification Success")
