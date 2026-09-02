import { Router } from "express";
import { authenticateUser } from "../middlewares/auth.middleware.js";
import { validateAddToCart } from "../validation/cart.validator.js";
import { addToCart, getCart, removeFromCart } from "../controllers/cart.controller.js";

const router = Router();

router.use(authenticateUser);

/**
 * @route POST /api/cart/add/:productId/:variantId
 * @desc Add item to cart
 * @access Private
 * @argument productId - ID of the product to add
 * @argument variantId - ID of the variant to add
 * @argument quantity - Quantity of the item to add (optional, default is 1)
 */
router.post("/add/:productId/:variantId", validateAddToCart, addToCart);

/**
 * @route GET /api/cart
 * @desc Get the current user's cart
 * @access Private
 */
router.get("/", getCart);

/**
 * @route DELETE /api/cart/remove/:productId/:variantId
 * @desc Remove item from cart
 * @access Private
 * @argument productId - ID of the product to remove
 * @argument variantId - ID of the variant to remove
 */
router.delete("/remove/:productId/:variantId", authenticateUser, removeFromCart);

export default router;