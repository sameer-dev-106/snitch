import { Router } from "express";
import { registerValidator } from "../validation/auth.validator.js";
import { register } from "../controllers/auth.controller.js";

const router = Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
router.post("/register", registerValidator, register);

export default router;
