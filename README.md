# EliteJet Backend API

## Overview
EliteJet Backend is a RESTful API built with Node.js, Express.js, MongoDB, and Mongoose.

## Main Features
- User registration and login
- JWT authentication
- Password hashing using bcrypt
- Role-based authorization (Admin / Client)
- Aircraft CRUD operations
- Booking management
- Ticket generation
- Weather API integration (Open-Meteo)

## Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- dotenv
- cors

## Installation

```bash
npm install
```

## Environment Variables

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## Run Project

```bash
npm run dev
```

Base URL:

```text
http://localhost:5000/api
```

# API Examples

## Register

POST /api/auth/register

```json
{
  "name":"Client User",
  "email":"client@example.com",
  "password":"123456",
  "role":"client"
}
```

## Login

POST /api/auth/login

```json
{
  "email":"admin2@elitejet.com",
  "password":"123456"
}
```

## Create Jet

POST /api/jets

```json
{
  "name":"Dassault Falcon 7X",
  "category":"Ultra-Long-Range",
  "seats":14,
  "speed":515,
  "range":"5950 nm",
  "price":9800
}
```

## Create Booking

POST /api/bookings

```json
{
  "jet":"jet_id_here",
  "departureCity":"Amman",
  "destinationCity":"London",
  "departureDate":"2026-07-10",
  "flightTime":"14:30",
  "tripType":"Round Trip",
  "returnDate":"2026-07-20",
  "passengers":4
}
```

## Weather API

GET /api/weather/amman

Example response:

```json
{
  "city":"amman",
  "temperature":28.4,
  "windSpeed":12.1
}
```

## Branches
- setup
- auth
- database
- jets
- bookings
- users
- api-integration
- deployment
- documentation
