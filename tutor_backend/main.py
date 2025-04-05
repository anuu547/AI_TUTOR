from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import cohere
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
API_KEY = os.getenv("COHERE_API_KEY")
co = cohere.Client(API_KEY)

# Initialize FastAPI app
app = FastAPI()

# Allow all origins (for development)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request models
class TutorRequest(BaseModel):
    question: str

class QuizRequest(BaseModel):
    topic: str

class RecommendRequest(BaseModel):
    history: list[str]

# Root route
@app.get("/")
def root():
    return {"message": "AI Tutor API is running!"}

# Tutor AI response route
@app.post("/tutor/")
async def tutor(request: TutorRequest):
    try:
        prompt = f"You are a helpful tutor. Answer this question:\n{request.question}"
        response = co.generate(
            model="command-r-plus",
            prompt=prompt,
            max_tokens=300,
            temperature=0.7
        )
        return {"answer": response.generations[0].text.strip()}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Quiz generation route
@app.post("/quiz/")
async def quiz(request: QuizRequest):
    try:
        prompt = f"Generate a 5-question multiple choice quiz on the topic '{request.topic}'. Each question should include 4 options (A–D) and mark the correct answer."
        response = co.generate(
            model="command-r-plus",
            prompt=prompt,
            max_tokens=400,
            temperature=0.7
        )
        return {"quiz": response.generations[0].text.strip()}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Recommendation generation route
@app.post("/recommend/")
async def recommend(request: RecommendRequest):
    try:
        joined_history = "\n".join(request.history)
        prompt = f"The student has studied the following:\n{joined_history}\nWhat topics should they study next to improve further?"
        response = co.generate(
            model="command-r-plus",
            prompt=prompt,
            max_tokens=150,
            temperature=0.7
        )
        return {"recommendations": response.generations[0].text.strip()}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
