from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from summarizer import summarize

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/summarize")
def get_summary(url: str):
    result = summarize(url)
    return result