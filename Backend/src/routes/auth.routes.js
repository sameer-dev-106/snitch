import { Router } from "express";
import { registerValidator, loginValidator } from "../validation/auth.validator.js";
import { getMe, googleCallBack, login, register } from "../controllers/auth.controller.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";
import passport from "passport";
import { config } from "../config/config.js";

const router = Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
router.post("/register", registerValidator, register);

/**
 * @route POST /api/auth/login
 * @desc Login a user
 * @access Public
 */
router.post("/login", loginValidator, login);

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback", passport.authenticate("google", {
    session: false,
    failureRedirect: config.NODE_ENV == "development" ? `${config.FRONTEND_URL}/login`: "/login"
}), googleCallBack);

/**
 * @route GET /api/auth/me
 * @description Get the authenticated user's profile
 * @access Private
 */
router.get("/me", authenticateUser, getMe);

export default router;
