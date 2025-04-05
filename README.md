
# AI-Powered Personal Tutor

This is a full-stack AI-powered personal tutor system built using **FastAPI** for the backend and **React** for the frontend. It uses **Cohere's AI API** to provide structured responses, generate quizzes, track user progress, and recommend what to study next.

---

##  Features

- 1. Ask any question and get structured AI answers
- 2. Generate quizzes based on your learning history
- 3. Track grades and progress
- 4. Get smart study recommendations
- 5. Firebase login system (secure auth)
- 6. Chatbot UI
- 7.Minimal, clean UI with Tailwind CSS and collapsible sidebar

---

## 📁 Folder Structure

```
AI_project/
├── tutor_backend/     # FastAPI backend
│   ├── main.py
│   ├── .env
│   └── ...
├── tutor_frontend/    # React frontend
│   ├── App.js
│   ├── package.json
│   └── ...
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/anuu547/AI_project.git
cd AI_project
```

### 2. Setup Backend

```bash
cd tutor_backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

#### 🔑 Create a `.env` file:

```
COHERE_API_KEY=your_cohere_api_key_here
FIREBASE_API_KEY=your_firebase_key
# Add other keys if needed
```

#### Run the backend:
```bash
uvicorn main:app --reload
```

---

### 3. Setup Frontend

```bash
cd ../tutor_frontend
npm install
npm start
```

The frontend runs at `http://localhost:3000`, and the backend at `http://127.0.0.1:8000`.

---

## 📝 Notes

- **DO NOT** commit your `.env` file or API keys to GitHub
- Firebase is used for authentication — make sure your Firebase config is correctly set in your frontend
- Backend is powered by [Cohere](https://cohere.com) for generating AI responses

---

# Extra Details
Anu (anuu547)  
seperately you can view the frontend and backend repositories using link below.
GitHub: [AI_frontend](https://github.com/anuu547/AI_frontend) |       [AI_backend](https://github.com/anuu547/AI_backend)

---

