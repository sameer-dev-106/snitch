import { Router } from "express";
import { authenticateSeller } from "../middlewares/auth.middleware.js";
import { createProduct } from "../controllers/product.controller.js";

const router = Router();
router.use(authenticateSeller);

router.post("/", createProduct);

export default router;