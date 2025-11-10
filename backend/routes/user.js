import express from "express";
import {
  deleteMyProfile,
  getMyProfile,
  login,
  logout,
  signUp,
} from "../controllers/user.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signUp);

router.get("/profile", isAuthenticated, getMyProfile);
router.get("/logout", isAuthenticated, logout);

router.delete("/delete", isAuthenticated, deleteMyProfile);

export default router;
