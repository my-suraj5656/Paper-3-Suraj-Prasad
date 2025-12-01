Event Booking System
A full-stack Event Booking System built using Node.js, Express.js, MongoDB, and Next.js/React.
The system allows users to:

Create and manage events
Register and cancel event bookings
View event listings
Authenticate using JWT
Perform CRUD operations for events
Implement protectedroutes middleware

// BaseUrl= http://localhost:3000/api/
POST /api/user/signup
POST /api/user/login

// event
POST /api/event/createevent
GET /api/event/getallevent
PUT /api/event/update/:id
DELETE /api/event/deletebyid/:id
POST /api/event/registerevent
PUT /api/event/cancelledevent/:id

🧩 React Frontend Functionality

✔ useContext for Authentication
✔ useState / useEffect / usememo
✔ ProtectedRoute Component
✔ Dynamic Card Rendering
✔ Search + Filter Logic
✔ Delete Event with API
✔ Responsive UI


👤 User Features (Frontend)
Create a new account (Signup)
Login using JWT authentication
Access protected pages using Context API (global auth)
Logout functionality
Protected routes using:useContext
PrivateRoute logic

Event Features

View all events (dynamic listing)
Search events by title / category
Filter events
Map through events dynamically to show cards (React .map())

challeges faces
1. Token authentication issues  
   - Solved by header validation middleware to verify.

2. Protected routes not working in frontend  
   - Fixed using React Context API along with custom PrivateRoute and localStorage handling.

3. Dynamic event rendering not updating after delete  
   - Solved by refreshing event list after delete API call.

4. Search and filter performance  
   - Improved by using useMemo and optimized filtering logic.
