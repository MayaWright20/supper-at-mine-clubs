import express from "express";
import {
  bookSeats,
  createSupper,
  getAllSuppers,
  getSupper,
  toggleFavourite,
} from "../controllers/supper.js";
import { isAuthenticated } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.post(
  "/suppers",
  isAuthenticated,
  upload.array("images", 5),
  createSupper,
);
router.get("/suppers", getAllSuppers);
router.get("/suppers/:id", getSupper);
router.patch("/suppers/:id/book", isAuthenticated, bookSeats);
router.patch("/suppers/:id/favourite", isAuthenticated, toggleFavourite);

export default router;
