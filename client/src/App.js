import { Route, Routes } from "react-router-dom";
import "./App.css";
import SignUp from "./pages/signUp";
import Login from "./pages/login";
import Event from "./pages/event";
import { ProtectedRoutes } from "./context/auth";
import About from "./pages/about";

function App() {
  return (
    <Routes>
      <Route exact path="/event" element={<Event />} />
      <Route path="/" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/about"
        element={
          <ProtectedRoutes>
            <About />
          </ProtectedRoutes>
        }
      />
    </Routes>
  );
}

export default App;
