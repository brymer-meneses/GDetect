from typing import Optional
from fastapi import FastAPI, File, UploadFile, Form, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import JSONResponse

from pydantic import BaseModel

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


from methods import verify_text, compute_facial_similarity, validate_faces
from database import session, User, Result, convert_status
from .config import is_enabled


def process_information(
    selfie_image: bytes,
    id_image: bytes,
    full_name: str,
    email_address: str,
):

    if verify_text(full_name, id_image):
        pass

    if not validate_faces([selfie_image, id_image]):
        pass

    if compute_facial_similarity(id_image, selfie_image) > 0.40:
        pass
    else:
        pass

    return


from utils import is_filetype_valid


@app.post("/api/status")
async def get_status(email_address: str = Form(...)):
    user = session.query(Result).filter(email=email_address).one_or_none()
    if user is None:
        return {"verification_status": 1, "message": None, "tips": None}

    return {
        "verification_status": user.verification_status,
        "message": convert_status(user.verification_status),
        "tips": None,  # Populate "tips"
    }


@app.post("/api/upload")
async def receive_information(
    background_tasks: BackgroundTasks,
    selfie_image: UploadFile = File(...),
    id_image: UploadFile = File(...),
    full_name: str = Form(...),
    email_address: str = Form(...),
) -> JSONResponse:

    """
    API Endpoint that receives information and
    assigns a function to process the information.
    """

    selfie_image_file = await selfie_image.read()
    id_image_file = await id_image.read()

    for image in [selfie_image, id_image]:
        if not is_filetype_valid(image.filename):
            return JSONResponse(status_code=400, content="Invalid Image Filetype")

    background_tasks.add_task(
        process_information, selfie_image_file, id_image_file, full_name, email_address
    )

    return JSONResponse(status_code=202, content="Upload Success!")
