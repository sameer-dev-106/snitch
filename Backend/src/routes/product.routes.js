import { Router } from "express";
import { authenticateSeller } from "../middlewares/auth.middleware.js";
import { createProduct, getAllProduct, getSellerProducts } from "../controllers/product.controller.js";
import { createProductValidator } from "../validation/product.validator.js";
import multer, { memoryStorage } from "multer";

const upload = multer({
    storage: memoryStorage(),
    limits: { fieldSize: 5 * 1024 * 1024 }
});

const router = Router();

/**
 * @route POST /api/products
 * @description Create a new product
 * @access Private (Seller only)
 */
router.post("/", authenticateSeller, upload.array("images", 7), createProductValidator, createProduct);

/**
 * @route GET /api/products/seller
 * @description Get all products of the authenticated seller
 * @access Private (Seller only)
 */
router.get("/seller", authenticateSeller, getSellerProducts);

/**
 * @route GET /api/products/seller
 * @description Get all product
 * @access Public
 */
router.get("/", getAllProduct);

export default router;