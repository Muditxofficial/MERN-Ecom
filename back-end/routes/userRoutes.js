import express from "express";

import {
  authUser,
  getUserProfile,
  registerUser,
} from "../controllers/userControllers.js";
const router = express.Router();
import { protect } from "../middleware/authMiddle.js";

router.route("/").post(registerUser);
router.post("/login", authUser);
router.route("/profile").get(protect, getUserProfile);
export default router;
