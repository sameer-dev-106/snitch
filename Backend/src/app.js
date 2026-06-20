import cookieParser from "cookie-parser";
import express from "express";
import morgan from "morgan";
import cors from "cors";

import authRouter from "./routes/auth.routes.js";
import { config } from "./config/config.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: config.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.get("/", (req, res) => {
    res.status(200).json({ message: "Server is running..." });
});

app.use("/api/auth", authRouter)

export default app;