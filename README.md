# Event Booking System

A full-stack Event Booking System built using Node.js, Express.js, MongoDB, and React.

## 🎯 System Features

The system allows users to:
- Create and manage events
- Register and cancel event bookings  
- View event listings with search & filter
- Authenticate using JWT
- Perform CRUD operations for events
- Real-time capacity tracking

---

## 📋 API Endpoints

### Base URL: `http://localhost:3000/api/`

### Authentication
```
POST /api/v1/user/signup       # Create new account
POST /api/v1/user/login        # Login with JWT token
```

### Events
```
POST   /api/v1/event/list               # List events (search, filter, paginate, sort)
GET    /api/v1/event/:id                # Get single event
POST   /api/v1/event/create             # Create new event
PUT    /api/v1/event/update/:id         # Update event
DELETE /api/v1/event/delete/:id         # Delete event
POST   /api/v1/event/register           # Register for event
POST   /api/v1/event/cancel/:id         # Cancel registration
POST   /api/v1/event/checkin/:id        # Check-in attendee
GET    /api/v1/event/attendees/:eventId # List attendees
```

---

## 🧩 Frontend Features (React)

✅ **Authentication**
- useContext for global auth state
- JWT token storage in localStorage
- Protected routes with PrivateRoute component

✅ **Event Management**
- View all events (dynamic listing)
- Search events by title / category
- Filter events by price, date, location
- Sort by date, popularity, price
- Pagination support
- Responsive card layout

✅ **User Features**
- Signup / Login
- Protected pages access
- Logout functionality
- Event registration
- Cancel registration
- View registration status

✅ **React Hooks Used**
- useState / useEffect / useMemo
- useContext for auth/state management
- useNavigate for routing

---

## 🗄️ Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  phone: String,
  password: String (hashed),
  role: "user" | "organizer" | "admin",
  createdAt: Date,
  updatedAt: Date
}
```

### Events Collection
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  image: String (URL),
  category: String,
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

### Registrations Collection
```javascript
{
  _id: ObjectId,
  event: ObjectId (ref: Event),
  user: ObjectId (ref: User),
  tickets: Number,
  status: "confirmed" | "waitlisted" | "cancelled" | "checked-in" | "checked-out",
  pricePaid: Number,
  paymentStatus: "pending" | "paid" | "failed" | "refunded",
  uniqueCode: String (unique),
  seatNumbers: [String],
  createdAt: Date,
  updatedAt: Date
}
```

---

## 📦 Database Dump

The MongoDB database dump is located in the `database-dump/` folder with complete restore instructions.

### Dump Contents
```
database-dump/
├── README.md                          # Detailed dump documentation
└── event_booking/
    ├── users.json + metadata.json
    ├── events.json + metadata.json
    └── registrations.json + metadata.json
```

### Sample Data Included
- 3 sample users (user, organizer, admin)
- 3 sample events (Tech Conference, Music Festival, Web Development)
- 4 sample registrations (confirmed, waitlisted, checked-in statuses)

### Restore Database

#### Install MongoDB Tools
```bash
# Windows: Download from https://www.mongodb.com/try/download/database-tools
# Mac: brew install mongodb-database-tools
# Linux: apt install mongodb-database-tools
```

#### Restore to MongoDB Atlas
```bash
mongoimport --uri="mongodb+srv://surajprasad5656_db_user:PASSWORD@cluster0.ygt5xgz.mongodb.net/event_booking" \
  --collection=users --file=database-dump/event_booking/users.json --jsonFormat=relaxed

mongoimport --uri="mongodb+srv://surajprasad5656_db_user:PASSWORD@cluster0.ygt5xgz.mongodb.net/event_booking" \
  --collection=events --file=database-dump/event_booking/events.json --jsonFormat=relaxed

mongoimport --uri="mongodb+srv://surajprasad5656_db_user:PASSWORD@cluster0.ygt5xgz.mongodb.net/event_booking" \
  --collection=registrations --file=database-dump/event_booking/registrations.json --jsonFormat=relaxed
```

#### Restore to Local MongoDB
```bash
mongoimport --db=event_booking --collection=users --file=database-dump/event_booking/users.json --jsonFormat=relaxed
mongoimport --db=event_booking --collection=events --file=database-dump/event_booking/events.json --jsonFormat=relaxed
mongoimport --db=event_booking --collection=registrations --file=database-dump/event_booking/registrations.json --jsonFormat=relaxed
```

---

## 🚀 Setup & Installation

### Backend (Server)
```bash
cd server
npm install
npm run dev
```

### Frontend (Client)
```bash
cd client
npm install
npm start
```

### Environment Variables (.env)
```
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/
PORT=3000
JWT_SECRET=your_secret_key
```

---

## 🐛 Challenges & Solutions

| Challenge | Solution |
|-----------|----------|
| Token authentication issues | Implemented header validation middleware to verify JWT tokens |
| Protected routes not working | Used React Context API with custom PrivateRoute component |
| Dynamic event rendering not updating | Refresh event list after delete API call |
| Search & filter performance | Optimized with useMemo and filtered before pagination |
| Search not working with pagination | Fixed by filtering full event list before paginating |

---

## 📚 Technology Stack

**Backend**
- Node.js / Express.js
- MongoDB / Mongoose
- JWT Authentication
- Bcrypt for password hashing

**Frontend**
- React.js
- Context API
- Axios for HTTP requests
- React Router for navigation
- Bootstrap / CSS for styling

---

## 📝 Key Features Implemented

### Capacity Management ✅
- Real-time seat availability tracking
- Automatic status updates (open → full)
- Waitlist management for sold-out events

### Registration System ✅
- Multi-step registration flow
- Duplicate prevention (unique user-event index)
- Unique code generation for tickets
- Payment status tracking

### Search & Discovery ✅
- Full-text search on title/description
- Filter by category, price, date, location
- Sort by date, popularity, price
- Pagination for large datasets
- Geospatial queries (location-based)

### Attendee Management ✅
- Check-in/check-out tracking
- Attendee list per event
- Registration status monitoring
- Cancellation with seat release

---

## 📄 License

This project is part of a technical skills assessment for an Event Booking System.

---

**Last Updated**: December 1, 2024
