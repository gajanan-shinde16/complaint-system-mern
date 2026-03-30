import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";

import roleMiddleware from "./middleware/roleMiddleware.js";
import authMiddleware from "./middleware/authMiddleware.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Complaint System API is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);

app.get("/api/test/user", authMiddleware, (req, res) => {
  res.json({
    message: "User Access Granted",
    user: req.user
  });
});

app.get("/api/test/admin",
  authMiddleware,
  roleMiddleware("admin"),
  (req, res) => {
  res.json({ message: "Admin Access Granted" });
});

app.use((req, res) => { 
  res.status(404).json({ message: "Route not found" }); 
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: "Something went wrong" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
); 