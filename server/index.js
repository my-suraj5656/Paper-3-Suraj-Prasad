import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import conn from "./database/connection/conn.js";
dotenv.config();
import userRoutes from "./modules/v1/auth/routes/userRoutes.js";
import eventRoutes from "./modules/v1/event/routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: [
      "https://paper-3-suraj-prasad.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/event", eventRoutes);

// app.get("/", (req, res) => {
//   res.send("Grocery App Server is running");
// });

conn()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start server:", error);
  });
