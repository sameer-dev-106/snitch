import { body, validationResult } from "express-validator";

function validateRequest(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ message: "Validation error", errors: errors.array() });
    next();
}

export const createProductValidator = [
    body("title").notEmpty().withMessage("Title is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("priceAmount").isNumeric().withMessage("Price amount must be a number"),
    body("priceCurrency").notEmpty().withMessage("Price currency is required"),
    body("variants").custom((value) => {
        let parsed;
        try {
            parsed = JSON.parse(value);
        } catch {
            throw new Error("Variants must be valid JSON");
        }
        if (!Array.isArray(parsed) || parsed.length === 0) {
            throw new Error("At least one variant (size/color) is required");
        }
        for (const v of parsed) {
            if (!v.attributes || Object.keys(v.attributes).length === 0) {
                throw new Error("Each variant needs at least one attribute (e.g. Size, Color)");
            }
            if (v.stock === undefined || Number(v.stock) < 0) {
                throw new Error("Each variant needs a valid stock value");
            }
        }
        return true;
    }),
    validateRequest
]