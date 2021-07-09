
# For image types
import uvicorn
from fastapi import FastAPI
app = FastAPI()

@app.get("/")
def index():
    return {"message", "This is the GDetect API"}

@app.post("/predict/image_edit")
def predict_image_edit():
    return {"prediction", "TODO"}

if __name__ == "__main__":
    uvicorn.run(app, host='127.0.0.1', port=8000)

