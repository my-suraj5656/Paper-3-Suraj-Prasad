# Database Dump - Event Booking System

## Overview
This folder contains the MongoDB database dump in JSON format for the Event Booking System.

## Contents

```
event_booking/
├── users.json                 # User collection (JSON export)
├── users.metadata.json        # User collection indexes
├── events.json                # Event collection (JSON export)
├── events.metadata.json       # Event collection indexes
├── registrations.json         # Registration collection (JSON export)
└── registrations.metadata.json # Registration collection indexes
```

## Collections

### Users Collection
- **3 sample users**: Regular user, Organizer, Admin
- Fields: name, email, phone, password (hashed), role, timestamps

### Events Collection
- **3 sample events**: Tech Conference, Music Festival, Web Development Workshop
- Fields: title, description, category, location (GeoJSON), dates, capacity, price, status, organizer reference

### Registrations Collection
- **4 sample registrations**: Mix of confirmed, waitlisted, and checked-in statuses
- Fields: event reference, user reference, tickets, status, payment info, unique code, seat numbers

## How to Restore

### Prerequisites
```bash
# Install MongoDB Database Tools
# Windows: Download from https://www.mongodb.com/try/download/database-tools
# Mac: brew install mongodb-database-tools
# Linux: apt install mongodb-database-tools
```

### Restore to MongoDB Atlas (Cloud)
```bash
mongoimport --uri="mongodb+srv://surajprasad5656_db_user:PASSWORD@cluster0.ygt5xgz.mongodb.net/event_booking" --collection=users --file=event_booking/users.json --jsonFormat=relaxed

mongoimport --uri="mongodb+srv://surajprasad5656_db_user:PASSWORD@cluster0.ygt5xgz.mongodb.net/event_booking" --collection=events --file=event_booking/events.json --jsonFormat=relaxed

mongoimport --uri="mongodb+srv://surajprasad5656_db_user:PASSWORD@cluster0.ygt5xgz.mongodb.net/event_booking" --collection=registrations --file=event_booking/registrations.json --jsonFormat=relaxed
```

### Restore to Local MongoDB
```bash
mongoimport --db=event_booking --collection=users --file=event_booking/users.json --jsonFormat=relaxed

mongoimport --db=event_booking --collection=events --file=event_booking/events.json --jsonFormat=relaxed

mongoimport --db=event_booking --collection=registrations --file=event_booking/registrations.json --jsonFormat=relaxed
```

## Database Schema

### Users
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique, indexed),
  phone: String,
  password: String (bcrypt hashed),
  role: "user" | "organizer" | "admin",
  createdAt: Date,
  updatedAt: Date
}
```

### Events
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  image: String (URL),
  category: String (indexed),
  location: {
    name: String,
    address: String,
    location: { type: "Point", coordinates: [lng, lat] }
  },
  startDate: Date,
  endDate: Date,
  price: Number,
  capacity: Number,
  seatsAvailable: Number,
  status: "open" | "full" | "closed" | "cancelled",
  organizer: ObjectId (ref: User),
  popularity: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Registrations
```javascript
{
  _id: ObjectId,
  event: ObjectId (ref: Event, indexed),
  user: ObjectId (ref: User, indexed),
  tickets: Number,
  status: "confirmed" | "waitlisted" | "cancelled" | "checked-in" | "checked-out",
  pricePaid: Number,
  paymentStatus: "pending" | "paid" | "failed" | "refunded",
  uniqueCode: String (unique, indexed),
  seatNumbers: [String],
  createdAt: Date,
  updatedAt: Date
}
```

## Indexes

### Users Index
- `_id` (primary)
- `email` (unique)

### Events Index
- `_id` (primary)
- `category`
- Full-text search on `title` and `description`
- Geospatial 2dsphere index on `location.location`

### Registrations Index
- `_id` (primary)
- `event + user` (unique compound)
- `uniqueCode` (unique)

## Sample Data
- Test users with different roles (user, organizer, admin)
- Realistic event listings with varied dates and capacities
- Registrations in different statuses (confirmed, waitlisted, checked-in)
- All passwords are hashed and sample data is for demonstration only

---
Created: December 1, 2024
