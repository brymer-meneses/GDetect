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

# from methods.facial_recognition import validate_faces, compute_facial_similarity
# from methods.id_verification import verify_text
from utils import is_filetype_valid
from utils import Queue

queue = Queue()


def process_information(
    selfie_image: bytes,
    id_image: bytes,
    full_name: str,
    email_address: str,
) -> bool:
    queue.add_to_queue(email_address)

    return True


@app.post("/api/status")
async def get_status(email_address: str = Form(...)) -> JSONResponse:

    if queue.is_finished(email_address):
        # print(f"{email_address} is finished")
        return JSONResponse(
            status_code=201, content="User has been verified! Congratulations!"
        )
    else:
        if queue.is_processing(email_address):
            # print(f"{email_address} is being processed")
            return JSONResponse(
                status_code=208,
                content="User Verification is currently being processed",
            )
        else:
            # print(f"{email_address} is NOT being processed")

            return JSONResponse(
                status_code=202, content="User Verification is not being processed"
            )


@app.post("/api/upload")
async def receive_information(
    background_tasks: BackgroundTasks,
    selfie_image: UploadFile = File(...),
    id_image: UploadFile = File(...),
    full_name: str = Form(...),
    email_address: str = Form(...),
):
    """ This function will run the core GDetect algorithm """

    selfie_image_file = await selfie_image.read()
    id_image_file = await id_image.read()

    for image in [selfie_image, id_image]:
        if not is_filetype_valid(image.filename):
            return JSONResponse(status_code=400, content="Invalid Image Filetype")

    background_tasks.add_task(
        process_information, selfie_image_file, id_image_file, full_name, email_address
    )

    return {"message", "received information"}
