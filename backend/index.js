import cookieParser from "cookie-parser";
import { config } from "dotenv";
import express from "express";
import helmet from "helmet";
import user from "./routes/user.js";
import supper from "./routes/supper.js";
import { errorMiddleware } from "./middleware/error.js";

config({
  path: "../config.env",
});

export const app = express();

app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res, next) => {
  res.json({
    success: true,
    message: "Server is working",
    availableRoutes: [
      "GET /",
      "POST /user/signup",
      "POST /user/login",
      "GET /user/profile",
      "GET /user/logout",
      "DELETE /user/delete",
      "POST /api/v1/user/signup",
      "POST /api/v1/user/login",
      "GET /api/v1/user/profile",
      "GET /api/v1/user/logout",
      "DELETE /api/v1/user/delete",
      "POST /suppers",
      "POST /api/v1/suppers",
      "GET /suppers",
      "GET /api/v1/suppers",
    ],
  });
});

app.use("/api/v1/user", user);
app.use("/user", user);
app.use("/api/v1", supper);
app.use("/", supper);

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

app.use(errorMiddleware);
