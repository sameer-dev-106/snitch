import { Router } from "express";
import { authenticateSeller } from "../middlewares/auth.middleware.js";
import { createProduct } from "../controllers/product.controller.js";
import { createProductValidator } from "../validation/product.validator.js";
import multer, { memoryStorage } from "multer";

const upload = multer({
    storage: memoryStorage(),
    limits: { fieldSize: 5 * 1024 * 1024 }
});

const router = Router();
router.use(authenticateSeller);

router.post("/", createProductValidator, upload.array("image", 7), createProduct);

export default router;