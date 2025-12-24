MERN Movie App

A full-stack movie web application built with the MERN stack (MongoDB, Express, React, Node.js), featuring role-based access control for users and admins.
Fetches movies from IMDb, supports search, sorting, pagination, and allows admins to add, edit, or delete movies.

Features
User Features

View all movies with pagination.

Search movies by title or description.

Sort movies by name, rating, release date, and duration.

Admin Features

Add new movies.

Edit or delete existing movies.

Protected routes with JWT-based authentication and role-based access control.

Technical Features

React.js frontend with Material-UI for responsive design.

Node.js + Express.js backend.

MongoDB database hosted on MongoDB Atlas.

Background IMDb movie insertion using BullMQ + Redis.

REST API endpoints for movies and authentication.

JWT authentication with role-based authorization.

Error handling and concurrency support.

Full deployment support (frontend on Vercel/Netlify, backend on Heroku/AWS/Railway).

Project Structure
mern-movie-app/
│
├── backend/
│   ├── config/          # DB & Redis config
│   ├── controllers/     # Auth & Movie controllers
│   ├── middleware/      # Auth, Role, Error handlers
│   ├── models/          # User & Movie Mongoose schemas
│   ├── routes/          # Auth & Movie routes
│   ├── workers/         # IMDb queue worker
│   ├── server.js        # Express server
│   └── .env             # Environment variables
│
├── frontend/
│   ├── src/
│   │   ├── api/         # Axios API config
│   │   ├── context/     # AuthContext
│   │   ├── components/  # MovieCard, Navbar, ProtectedRoute
│   │   ├── pages/       # Home, Search, Login, AdminAdd/Edit
│   │   ├── App.js       # Routing
│   │   └── index.js     # Entry point
│   └── package.json
│
└── README.md

Prerequisites

Node.js >= 18

npm >= 9

MongoDB Atlas account

Redis server (for BullMQ queue)

Backend Setup

Navigate to backend:

cd backend


Install dependencies:

npm install


Create a .env file:

PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
REDIS_HOST=127.0.0.1
REDIS_PORT=6379


Start server:

npm run dev


Server runs at: http://localhost:5000

Frontend Setup

Navigate to frontend:

cd frontend


Install dependencies:

npm install


Create .env file:

REACT_APP_API_URL=http://localhost:5000/api


Start frontend:

npm start


Frontend runs at: http://localhost:3000

API Endpoints
Authentication
Method	Endpoint	Body	Access
POST	/api/auth/login	{ email, password }	Public
Movies
Method	Endpoint	Body / Query	Access
GET	/api/movies	-	Public
GET	/api/movies/search?q=keyword	-	Public
GET	/api/movies/sorted?by=field	-	Public
POST	/api/movies	{ title, description, rating, releaseDate, duration }	Admin
PUT	/api/movies/:id	{ ...fields }	Admin
DELETE	/api/movies/:id	-	Admin

Frontend Pages

/ → Home page (movie list with pagination)

/search → Search movies

/login → User/Admin login

/admin/add → Admin add movie (Protected)

/admin/edit → Admin edit/delete movie (Protected)

Deployment
Backend

Deploy to Heroku, Railway, or AWS EC2.

Set environment variables on hosting platform.

Use MongoDB Atlas & Redis cloud if needed.

Frontend

Deploy to Vercel or Netlify.

Update REACT_APP_API_URL to point to deployed backend.

Sample Admin User
Email	Password	Role
admin@example.com
	Admin@123	admin

Create manually in MongoDB if needed.

Notes

Ensure Redis server is running for background IMDb insertion jobs.

JWT token is stored in localStorage; clear to logout.

Movies are searchable and sortable with text indexes for fast queries.

💻 Tech Stack

Frontend: React.js, Material-UI, Axios, React Router, Context API

Backend: Node.js, Express.js, MongoDB, Mongoose, JWT, BullMQ

Deployment: Vercel/Netlify (frontend), Heroku/AWS (backend), MongoDB Atlas

References

IMDb Top 250 Movies: https://www.imdb.com/chart/top

Material-UI: https://mui.com/

React Router: https://reactrouter.com/

JWT: https://jwt.io/