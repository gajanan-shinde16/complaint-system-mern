import express from "express";
import {
  createComplaint,
  getMyComplaints,
  getAllComplaints,
  updateComplaintStatus
} from "../controllers/complaintController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

// USER routes
router.post("/", authMiddleware, createComplaint);
router.get("/my", authMiddleware, getMyComplaints);

// ADMIN routes
router.get("/all", authMiddleware, roleMiddleware("admin"), getAllComplaints);
router.patch("/:id", authMiddleware, roleMiddleware("admin"), updateComplaintStatus);

export default router;