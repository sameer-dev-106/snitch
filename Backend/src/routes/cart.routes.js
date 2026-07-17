import { Router } from "express";
import { authenticateUser } from "../middlewares/auth.middleware.js";
import { validateAddToCart } from "../middlewares/cart.middleware.js";
import { addToCart, getCart } from "../controllers/cart.controller.js";

const router = Router();

/**
 * @route POST /api/cart/add/:productId/:variantId
 * @desc Add item to cart
 * @access Private
 * @argument productId - ID of the product to add
 * @argument variantId - ID of the variant to add
 * @argument quantity - Quantity of the item to add (optional, default is 1)
 */
router.post("/add/:productId/:variantId", authenticateUser, validateAddToCart, addToCart);

/**
 * @route GET /api/cart
 * @desc Get the current user's cart
 * @access Private
 */
router.get("/", authenticateUser, getCart);

export default router;