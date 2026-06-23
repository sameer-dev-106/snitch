import cookieParser from "cookie-parser";
import express from "express";
import morgan from "morgan";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

import { config } from "./config/config.js";
import authRouter from "./routes/auth.routes.js";
import handleError from "./middlewares/error.middleware.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

passport.use(new GoogleStrategy({
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));

app.get("/", (req, res) => {
    res.status(200).json({ message: "Server is running..." });
});

// Routes
app.use("/api/auth", authRouter)

// Error handling middleware
app.use(handleError);

export default app;