import { Router } from "express";
import { authenticateSeller } from "../middlewares/auth.middleware.js";
import { createProduct, getSellerProducts } from "../controllers/product.controller.js";
import { createProductValidator } from "../validation/product.validator.js";
import multer, { memoryStorage } from "multer";

const upload = multer({
    storage: memoryStorage(),
    limits: { fieldSize: 5 * 1024 * 1024 }
});

const router = Router();
router.use(authenticateSeller);

/**
 * @route POST /api/products
 * @description Create a new product
 * @access Private (Seller only)
 */
router.post("/", createProductValidator, upload.array("image", 7), createProduct);

/**
 * @route GET /api/products/seller
 * @description Get all products of the authenticated seller
 * @access Private (Seller only)
 */
router.get("/seller", getSellerProducts);

export default router;