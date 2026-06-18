import { body, validationResult } from "express-validator";

function validate(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

export const registerValidator = [
    body("email")
        .trim()
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Please provide a valid email"),

    body("contact")
        .notEmpty().withMessage("Contact is required")
        .matches(/^\d{10}$/).withMessage("Contact must be a 10-digit number"),

    body("password")
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),

    body("fullname")
        .trim()
        .notEmpty().withMessage("Full name is required")
        .isLength({ min: 3 }).withMessage("Full name must be at least 3 characters long"),

    body("isSeller")
        .optional()
        .isBoolean().withMessage("isSeller must be a boolean value"),

    validate
]

export const loginValidator = [
    body("email")
        .trim()
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Please provide a valid email"),

    body("password")
        .notEmpty().withMessage("Password is required"),

    validate
];
