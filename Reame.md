Task-Manager

A full-stack MERN Task Manager application where users can create projects, manage tasks, track progress, and monitor dashboard statistics in real time.

Live Demo
Frontend

Frontend Deployment

Backend API

Backend Deployment

Features
User Authentication (Register/Login)
JWT Token Authentication
Create and Manage Projects
Create and Manage Tasks
Task Status Update
Dashboard Statistics
Protected Routes
Responsive UI
MERN Stack Architecture
REST API Integration
Deployment using Vercel and Railway
Tech Stack
Frontend
React.js
Vite
Tailwind CSS
Axios
React Router DOM
Backend
Node.js
Express.js
MongoDB
Mongoose
JWT Authentication
bcryptjs
Deployment
Vercel (Frontend)
Railway (Backend)  .

Structure

 Task-Manager/
│
├── Backend/
│   ├── src/
│   ├── package.json
│
├── frontend/
│   ├── frontend/
│   │   ├── src/
│   │   ├── package.json


git clone https://github.com/Avirajsinghsagar/Task-Mnager.git

 Backend Setup 
 
 cd Backend

npm install

npm run dev

Frontend Setup

cd frontend/frontend

npm install

npm run dev

API Routes
Auth Routes

POST /api/auth/register
POST /api/auth/login

Task Routes

GET /api/tasks
POST /api/tasks
PUT /api/tasks/:id

Dashboard Route
GET /api/dashboard

Author
Aviraj Singh Sagar

GitHub:https://github.com/
