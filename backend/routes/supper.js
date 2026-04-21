import express from "express";
import { createSupper, getAllSuppers } from "../controllers/supper.js";
import { isAuthenticated } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.post("/suppers", isAuthenticated, upload.array("images", 5), createSupper);
router.get("/suppers", getAllSuppers);
// router.get("/logout", isAuthenticated, logout);

// router.delete("/delete", isAuthenticated, deleteMyProfile);

export default router;
