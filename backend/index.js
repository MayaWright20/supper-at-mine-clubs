import cookieParser from "cookie-parser";
import { config } from "dotenv";
import express from "express";
import helmet from "helmet";
import user from "./routes/user.js";

config({
    path: "../config.env"
});

export const app = express();

// app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res, next)=> {
    res.json({
        success: true,
        message: "Server is working",
        availableRoutes: [
            "GET /",
            "POST /user/signup",
            "POST /api/v1/user/signup",
        ]
    })
})

app.use("/api/v1/user", user);
app.use("/user", user);

app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`
    });
});