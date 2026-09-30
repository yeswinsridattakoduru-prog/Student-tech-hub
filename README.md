# Student Tech Hub

Student Tech Hub is a beginner-friendly full-stack web application designed to show upcoming technical events and allow students to register for updates. 

This project demonstrates how a simple frontend (HTML, CSS, JavaScript) communicates with a modern backend (Python, FastAPI).

## Project Structure

- `frontend/`: Contains the user interface (HTML, CSS, JavaScript).
- `backend/`: Contains the server code (Python, FastAPI).

## Prerequisites

- Python 3.7 or higher installed on your system.
- A web browser.

## Backend Setup & Running

1. Open a terminal or command prompt.
2. Navigate to the `backend` directory of this project:
   ```bash
   cd backend
   ```
3. Install the required Python packages:
   ```bash
   pip install -r requirements.txt
   ```
4. Start the FastAPI server using `uvicorn`:
   ```bash
   uvicorn main:app --reload
   ```
   *The `--reload` flag means the server will automatically restart if you change the code.*

5. The backend is now running at `http://localhost:8000`. You can view the automatic API documentation by visiting `http://localhost:8000/docs` in your browser.

## Running the Frontend Locally

Since the frontend consists of plain HTML, CSS, and JavaScript files, you don't need a complex server to run it.

1. Navigate to the `frontend` directory in your file explorer.
2. Double-click the `index.html` file to open it in your default web browser.

*Alternative method using Python:*
If you prefer to run it on a local server, you can navigate to the `frontend` directory in a new terminal and run:
```bash
python -m http.server 8080
```
Then open `http://localhost:8080` in your browser.

## How the Frontend Communicates with the Backend

1. **CORS:** The backend uses `CORSMiddleware` to allow requests from the frontend, even if they are running on different ports or origins (like a local file `file://...` vs a local server `http://localhost:8000`).
2. **Fetching Data (GET):** When you click "Load Events" on the frontend, the `script.js` file uses the `fetch()` API to make a GET request to the backend's `http://localhost:8000/api/events` endpoint. The backend returns the event data in JSON format, which the frontend then parses and displays on the page.
3. **Submitting Data (POST):** When you submit the registration form, the frontend prevents the default page reload, packages your name and email into a JSON object, and sends a POST request to `http://localhost:8000/api/register`. The backend receives this data, prints it to the console (as a placeholder for saving to a database), and returns a success message to the frontend.
