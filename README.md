# Pro Tasker

A full-stack task and project management application built with React (frontend) and Node.js / Express / MongoDB (backend). Users can register, log in, create projects, and manage tasks within each project.


##  Live Links

- Backend API: https://pro-tasker-mern-full-stack-project-1.onrender.com
- Frontend: https://pro-tasker-mern-full-stack.netlify.app

# Features

- User authentication (Register/Login)

- Create, update, and delete projects

- Create, update, and delete tasks under projects

- User-specific data (each user sees their own projects)

- Dashboard to manage projects

- Task status tracking

- Protected routes using authentication

- Responsive UI (basic responsive navbar)

# Tech Stack

## Frontend

- React

- React Router DOM

- Axios

- Context API (User state management)

- Inline CSS

## Backend

- Node.js

- Express.js

- MongoDB (Mongoose)

- JWT Authentication

- REST API

## Project Structure

```
pro-tasker/
└── pro-tasker-frontend/
    ├── public/
    │   └── _redirects
    │
    ├── src/
    │   ├── assets/
    │   │   └── logo/
    │   │
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── ProjectCard.jsx
    │   │   ├── TaskCard.jsx
    │   │   └── Spinner.jsx
    │   │
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Dashboard.jsx
    │   │   └── ProjectDetails.jsx
    │   │
    │   ├── context/
    │   │   └── UserContext.jsx
    │   │
    │   ├── hooks/
    │   │   └── useAuthValidation.js
    │   │
    │   ├── clients/
    │   │   └── api.js
    │   │
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    │
    ├── .env
    ├── package.json
    └── vite.config.js

```

```
pro-tasker/
└── pro-tasker-backend/
    ├── config/
    │   └── connection.js               
    │
    ├── controllers/
    │   ├── userControllers.js    
    │   ├── projectControllers.js
    │   └── taskControllers.js
    │
    ├── models/
    │   ├── Project.js              
    │   ├── Task.js         
    │   └── User.js            
    │
    ├── routes/
    │   ├── userRoutes.js
    │   ├── projectRoutes.js
    │   └── taskRoutes.js
    │
    ├── utils/
    │   └── auth.js     
    │
    ├── .env
    ├── .gitignore
    ├── package.json
    └── server.js                

```
 
  


## Installation & Setup

# 1. Clone the repository
- git clone [<your-repo-url>](https://github.com/krishnakatwal/pro-tasker-mern-full-stack-project.git)

- cd pro-tasker-mern-full-stack-project.git

## 2. Backend Setup

- cd pro-tasker-backend

- npm install

## Create a .env file:

- PORT=5000

- MONGO_URI=your_mongodb_connection_string

- JWT_SECRET=your_secret_key

## Run backend:

- npm run dev

## Frontend Setup

- cd ../pro-tasker-frontend

- npm install

## Create a .env file:

- VITE_BASE_URL=http://localhost:3000

## Run frontend:

- npm run dev

## Authentication Flow

- User registers or logs in

- Backend returns a JWT token

- Token is stored in localStorage

- Token is attached to API requests for protected routes

-User context manages authentication state

## API Endpoints (Example)

### User
- POST/api/users/register	
- POST/api/users/login	
- GET/api/users/	

### Projects
- GET /api/projects
- POST /api/projects
- PUT /api/projects/:projectId
- DELETE /api/projects/projectId

### Tasks
- GET /api/projects/:projectId/tasks
- POST /api/projects/ :projectId/tasks
- PUT /api/tasks/:taskId
- DELETE /api/tasks/:taskId