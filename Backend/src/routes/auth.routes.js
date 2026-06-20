import { Router } from "express";
import { registerValidator, loginValidator } from "../validation/auth.validator.js";
import { login, register } from "../controllers/auth.controller.js";

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

export default router;
