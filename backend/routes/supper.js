import express from "express";
import { createSupper } from "../controllers/supper.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/suppers", isAuthenticated, createSupper);
// router.post("/signup", signUp);

// router.get("/suppers", isAuthenticated, getMyProfile);
// router.get("/logout", isAuthenticated, logout);

// router.delete("/delete", isAuthenticated, deleteMyProfile);

export default router;
