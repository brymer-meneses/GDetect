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


from utils import Queue

queue = Queue()

from methods import verify_text, compute_facial_similarity, validate_faces


def process_information(
    selfie_image: bytes,
    id_image: bytes,
    full_name: str,
    email_address: str,
):
    global queue
    queue.add_to_queue(email_address)

    if verify_text(full_name, id_image):
        #  TODO: Save status to Database
        pass

    if not validate_faces(selfie_image, id_image):
        #  TODO: Save status to Database
        pass

    if compute_facial_similarity(id_image, selfie_image) > 0.40:
        #  TODO: Accept verification
        pass
    else:
        #  TODO: Reject verification
        pass

    queue.remove_from_queue(email_address)
    return


@app.post("/api/status")
async def get_status(email_address: str = Form(...)) -> JSONResponse:

    global queue
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


from utils import is_filetype_valid


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
