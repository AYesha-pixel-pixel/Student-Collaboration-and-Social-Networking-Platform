# Student Collaboration and Social Networking Platform

A full-stack MERN app for student communities built around posts, societies, and real-time chat. The client is a React + Vite app; the server is an Express API backed by MongoDB and Socket.IO.

## Highlights
- Fast, clean social feed with comments and likes
- Society spaces with sections, roles, and moderation tools
- Real-time messaging with read receipts
- Cloudinary-backed image uploads

## Features
- JWT auth, profiles, and follow system
- Public and society posts with comments and likes
- Society sections, roles, and moderation tools
- Real-time messaging with Socket.IO and read receipts
- Image uploads via Cloudinary

## Tech Stack
- Client: React, Vite, React Router, Axios, Socket.IO client
- Server: Node.js, Express, MongoDB, Mongoose, Socket.IO, Multer, JWT (jsonwebtoken)
- Media: Cloudinary

## Project Structure
```
client/   # React app (Vite)
server/   # Express API + Socket.IO
```

## Quick Start
```
cd server
npm install
node index.js

cd ../client
npm install
npm run dev
```

## Prerequisites
- Node.js
- MongoDB (local or Atlas)
- Cloudinary account (for image uploads)

## Environment Variables

Create `server/.env`:
```
MONGO_URI=mongodb://localhost:27017/student_network
JWT_SECRET=replace_with_a_strong_secret
PORT=5001
CLIENT_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Create `client/.env` (optional, defaults shown):
```
VITE_API_URL=http://localhost:5001/api
```

## Local Development

### 1) Install dependencies
```
cd server
npm install

cd ../client
npm install
```

### 2) Start the API server
```
cd server
node index.js
```

The API defaults to `http://localhost:5001` and Socket.IO shares the same port.

### 3) Start the client
```
cd client
npm run dev
```

Open `http://localhost:5173`.

## Docker (API + MongoDB)

This repo includes a `docker-compose.yml` for the backend and MongoDB only. It exposes the API on port 5000.

```
docker compose up --build
```

If you use Docker for the API, update `VITE_API_URL` to `http://localhost:5000/api`.

## Socket Events (Messaging)
- `socket:ready` server -> client, confirms connection
- `conversation:join` / `conversation:leave`
- `message:send` (acknowledged)
- `message:new` and `message:received` broadcasts
- `message:read` broadcast

## Notes
- Cloudinary env vars are required when uploading images.
- The API returns JSON for 404s and server errors.

## Project Members
- Sohaib Mubashir
- Alishbah Riaz
- Laiba Murtaza
- Ayesha Saleem

## License

ISC
