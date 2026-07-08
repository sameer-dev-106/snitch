import { Router } from "express";
import { authenticateSeller } from "../middlewares/auth.middleware.js";
import { addProductVariants, createProduct, getAllProduct, getProductDetails, getSellerProducts } from "../controllers/product.controller.js";
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

/**
 * @route GET /api/products/detail/:id
 * @description Get product details
 * @access Public
 */
router.get("/detail/:id", getProductDetails);

/**
 * @route POST /api/products/productId/variants
 * @description Add a new variant to a product
 * @access Private (Seller only)
 */
router.post("/:productId/variants", authenticateSeller, upload.array("Image", 7), addProductVariants);

export default router;