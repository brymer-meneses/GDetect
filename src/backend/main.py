
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel

app = FastAPI()

# TODO
# Make "origins" more specific by only allowing certain links
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
    filename: str
    dimensions: str


@app.post("/api/upload-selfie", response_model=UploadResponse)
async def predict_image_edit(image: UploadFile = File(...)):
    contents = await image.read()
    nparr = np.fromstring(contents, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    img_dimensions = str(img.shape)
    
    return {
        "filename": image.filename,
        "dimensions": img_dimensions
    }
    
    


