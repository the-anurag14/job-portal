from fastapi import FastAPI
from pydantic import BaseModel
from model import match_resume

app = FastAPI()

class ResumeRequest(BaseModel):
    resume: str
    job_description: str

@app.post("/match")
def match(data: ResumeRequest):
    score = match_resume(data.resume, data.job_description)
    return {"match_score": score}