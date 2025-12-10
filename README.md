Event Booking System

This project is a simple Event Booking System built with Node.js, Express.js, MongoDB and React.
Users can create events, update events, register for events and view event details.

Features

Create and manage events
User registration and login using JWT
Book and cancel event bookings
View all events with search and filters
CRUD operations for events

API Base URL
http://localhost:3000/api/

Authentication APIs
POST /api/v1/user/signup      - Register user
POST /api/v1/user/login       - Login user and get JWT token

Event APIs
POST   /api/v1/event/list                 - List all events with search, filters and pagination
GET    /api/v1/event/:id                  - Get single event
POST   /api/v1/event/create               - Create event
PUT    /api/v1/event/update/:id           - Update event
DELETE /api/v1/event/delete/:id           - Delete event
POST   /api/v1/event/register             - Register user for event
POST   /api/v1/event/cancel/:id           - Cancel event registration

Frontend (React) Features

User signup and login
JWT stored in localStorage
Protected routes
List, search, filter
Pagination
Logout feature

React Hooks used: useState, useEffect, useContext, useMemo, useNavigate.

Database Schema
Database Dump

A dump folder named database-dump is included.
It contains sample users, events, and registrations.

Restore to MongoDB Atlas
mongoimport --uri="YOUR_MONGO_ATLAS_URI" \
  --collection=users --file=database-dump/event_booking/users.json --jsonFormat=relaxed

mongoimport --uri="YOUR_MONGO_ATLAS_URI" \
  --collection=events --file=database-dump/event_booking/events.json --jsonFormat=relaxed

mongoimport --uri="YOUR_MONGO_ATLAS_URI" \
  --collection=registrations --file=database-dump/event_booking/registrations.json --jsonFormat=relaxed

Restore to local MongoDB
mongoimport --db=event_booking --collection=users --file=database-dump/event_booking/users.json --jsonFormat=relaxed
mongoimport --db=event_booking --collection=events --file=database-dump/event_booking/events.json --jsonFormat=relaxed
mongoimport --db=event_booking --collection=registrations --file=database-dump/event_booking/registrations.json --jsonFormat=relaxed

