import express from "express";
import {
  deleteMyProfile,
  getMyProfile,
  login,
  logout,
  signUp,
  updateMyAvatar,
} from "../controllers/user.js";
import { isAuthenticated } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", upload.single("avatar"), signUp);

router.get("/profile", isAuthenticated, getMyProfile);
router.put("/profile/avatar", isAuthenticated, upload.single("avatar"), updateMyAvatar);
router.get("/logout", isAuthenticated, logout);

router.delete("/delete", isAuthenticated, deleteMyProfile);

export default router;
