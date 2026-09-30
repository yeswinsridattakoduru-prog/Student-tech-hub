from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Enable CORS (Cross-Origin Resource Sharing)
# This allows the frontend (running on a different port) to talk to this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins for development
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

# Sample Data
sample_events = [
    {
        "id": 1,
        "title": "Introduction to Web Development",
        "date": "2026-10-15",
        "location": "Room 101",
        "description": "Learn the basics of HTML, CSS, and JavaScript."
    },
    {
        "id": 2,
        "title": "Python for Data Science Workshop",
        "date": "2026-10-22",
        "location": "Computer Lab A",
        "description": "Hands-on session with Pandas and NumPy."
    },
    {
        "id": 3,
        "title": "Hackathon 2026 Kickoff",
        "date": "2026-11-01",
        "location": "Main Auditorium",
        "description": "Join us to start the annual coding competition."
    }
]

# Pydantic model to define the expected structure of incoming registration data
class RegistrationRequest(BaseModel):
    name: str
    email: str

@app.get("/api/events")
async def get_events():
    """Returns a list of upcoming events."""
    return sample_events

@app.post("/api/register")
async def register_student(request: RegistrationRequest):
    """Accepts student registration data."""
    # In a real app, you would save this to a database
    print(f"Received registration: {request.name} ({request.email})")
    
    return {
        "message": f"Successfully registered {request.name}!",
        "status": "success"
    }
