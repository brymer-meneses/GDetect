"""
Handles the API for receiving information
"""


from fastapi import FastAPI, File, UploadFile, Form, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
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


from gdetect.database import session, User, Result, convert_status
from gdetect.guards import verify_filetype

from gdetect.main import process_information


@app.on_event("startup")
def clean_database():
    """ Removes pending tasks that were not finished for some reason """
    unfinished_tasks = (
        session.query(Result).filter(Result.verification_status == 2).all()
    )
    for task in unfinished_tasks:
        session.delete(task)

    session.commit()
    return


@app.post("/api/status")
async def get_status(email_address: str = Form(...)):
    user = session.query(Result).filter(Result.email == email_address).one_or_none()
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
        if not verify_filetype(image.filename):
            return JSONResponse(status_code=400, content="Invalid Image Filetype")

    background_tasks.add_task(
        process_information, selfie_image_file, id_image_file, full_name, email_address
    )

    return JSONResponse(status_code=202, content="Upload Success!")