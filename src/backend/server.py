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


from gdetect.database import session, User, Task
from gdetect.guards import verify_filetype
from gdetect.utils import get_messages
from gdetect.main import process_information


@app.on_event("startup")
def clean_database():
    """Removes pending tasks that were not finished for unknown reason"""
    unfinished_tasks = session.query(Task).filter(Task.verification_status == 2).all()
    for task in unfinished_tasks:
        session.delete(task)

    session.commit()
    return


@app.post("/api/status")
async def get_status(email_address: str = Form(...)):
    pending_task = session.query(Task).filter(Task.email == email_address).one_or_none()
    if pending_task is None:
        print("hello")
        user = session.query(User).filter(User.email == email_address).one_or_none()
        if user is None:
            return {
                "verification_status": 1,
                "verification_failures": None,
            }
        else:
            return {
                "verification_status": 0,
                "verification_failures": None,
            }

    return {
        "verification_status": pending_task.verification_status,
        "verification_failures": get_messages(pending_task.verification_failures),
    }


@app.post("/api/upload")
async def receive_information(
    background_tasks: BackgroundTasks,
    selfie_image: UploadFile = File(...),
    id_image: UploadFile = File(...),
    full_name: str = Form(...),
    email_address: str = Form(...),
    retry_verification: bool = Form(...),
) -> JSONResponse:

    """
    API Endpoint that receives information and
    assigns a function to process the information.
    """

    selfie_image_file = await selfie_image.read()
    id_image_file = await id_image.read()

    for image in [selfie_image, id_image]:
        if not verify_filetype(image.filename):
            return JSONResponse(status_code=200, content="Invalid Image Filetype")

    background_tasks.add_task(
        process_information,
        selfie_image_file,
        id_image_file,
        full_name,
        email_address,
        retry_verification,
    )

    return JSONResponse(status_code=202, content="Upload Success!")
