🏙️ UrbanMind

AI-Powered Urban Planning & Smart City Decision Intelligence Platform

UrbanMind is a full-stack smart city decision-support platform combining GIS, infrastructure management, citizen issue tracking, spatial planning, analytics, AI recommendations, conversational AI, and report generation.

It helps urban planners, analysts, administrators, and citizens monitor infrastructure, track civic issues, analyze urban data, and make data-driven planning decisions using live MongoDB data.

🎯 Project Objective

UrbanMind provides a centralized platform to manage, visualize, analyze, and understand urban infrastructure and citizen issues with AI-assisted planning insights.

✨ Features

🌍 GIS Workspace

Interactive GIS workspace for visualizing real infrastructure and citizen issues with live geographic data.

🏗️ Infrastructure Management

Manage infrastructure assets, locations, utilization, capacity, and operational status using MongoDB.

🏛️ Citizen Portal

Allows citizens to report and track civic issues with categories, priorities, locations, and resolution status.

🧩 Scenario Builder

Spatial planning workspace for exploring the current urban environment and infrastructure distribution.

🤖 AI Recommendation Center

Uses the local AI model to analyze current infrastructure and citizen-issue data and generate planning recommendations.

💬 AI Urban Planning Assistant

Conversational AI assistant for asking natural-language questions about the current urban dataset.

📊 Analytics Center

Provides live infrastructure, issue, health, and resolution analytics from MongoDB data.

📈 Dashboard

Provides a centralized overview of infrastructure, citizen issues, operational coverage, geographic data, and AI insights.

📄 Reports Center

Generates structured urban planning reports using current infrastructure, issue, analytics, and AI data.

🔐 Authentication & RBAC

JWT authentication with role-based access for Citizen, Planner, Analyst, and Admin users.

🧠 AI Architecture

UrbanMind uses a local AI pipeline powered by FastAPI, Ollama, and Qwen3 1.7B.

React
  ↓
Node.js / Express
  ↓
MongoDB
  ↓
FastAPI
  ↓
Ollama
  ↓
Qwen3 1.7B

The backend provides the AI service with relevant infrastructure and citizen-issue data for analysis.

🛠️ Technology Stack

Frontend

React.js

Vite

React Router

Zustand

Tailwind CSS

Leaflet.js

Recharts

Axios

Framer Motion

Lucide React

React Markdown

Backend

Node.js

Express.js

Mongoose

JWT

REST APIs

Axios

Database

MongoDB

MongoDB Atlas

AI

Python

FastAPI

HTTPX

Ollama

Qwen3 1.7B

Deployment

Vercel

Render

MongoDB Atlas

📋 Prerequisites

Node.js 20+

npm

Python 3.10+

MongoDB / MongoDB Atlas

Ollama

Git

Verify installations:

node --version
npm --version
python --version
ollama --version
git --version

Install the AI model:

ollama pull qwen3:1.7b

🚀 Installation

1. Clone the Repository

git clone <YOUR_GITHUB_REPOSITORY_URL>
cd urban-planning-platform

2. Backend

cd backend
npm install

Create a .env file:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
AI_SERVICE_URL=http://127.0.0.1:8000

Start the backend:

npm run dev

3. AI Service

Open a new terminal:

cd ai-service
pip install -r requirements.txt
python main.py

AI service:

http://localhost:8000

4. Frontend

Open another terminal:

cd frontend
npm install
npm run dev

▶️ Running the Project

Terminal 1 → Backend
npm run dev

Terminal 2 → AI Service
python main.py

Terminal 3 → Frontend
npm run dev

Ollama should remain running with qwen3:1.7b available.

📁 Project Structure

urban-planning-platform/
│
├── frontend/
│   └── src/
│       ├── app/
│       ├── components/
│       ├── features/
│       ├── services/
│       └── store/
│
├── backend/
│   └── src/
│       ├── controllers/
│       ├── middleware/
│       ├── models/
│       ├── routes/
│       └── services/
│
├── ai-service/
│   ├── main.py
│   └── requirements.txt
│
└── README.md

🔄 Data Flow

Infrastructure / Citizen Issues
             ↓
          MongoDB
             ↓
       Node.js Backend
             ↓
    ┌────────┼─────────┐
    ↓        ↓         ↓
   GIS   Analytics    AI
    │        │         │
    └────────┼─────────┘
             ↓
          Reports

🔐 Security

JWT-based authentication

Backend-enforced role-based authorization

MongoDB authentication

Environment variables for sensitive configuration

Protected API endpoints


🌐 Deployment

Frontend: Vercel

Backend: Render

Database: MongoDB Atlas

The AI inference layer currently runs locally using:

FastAPI → Ollama → Qwen3 1.7B

for development and demonstration.

📌 Project Highlights

Full-stack MERN architecture

Interactive GIS workspace

Live MongoDB-backed urban data

Citizen issue management

Spatial scenario planning

AI-powered decision support

Local LLM inference

Conversational AI

Dynamic analytics

AI-assisted report generation

JWT authentication and RBAC

Cloud deployment

