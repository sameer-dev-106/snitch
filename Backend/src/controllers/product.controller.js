import productModel from "../models/product.model.js";
import { uploadFile } from "../services/storage.service.js";

export const createProduct = async (req, res, next) => {
    try {
        const { title, description, priceAmount, priceCurrency } = req.body;
        const seller = req.body;
        const images = await Promise.all(req.files.map(async (file) => {
            return await uploadFile({
                buffer: file.buffer,
                fileName: file.originalname
            });
        }));
        const product = await productModel.create({
            title,
            description,
            price: { amount: priceAmount, currency: priceCurrency || "INR" },
            images,
            seller: seller._id
        });
        res.status(201).json({
            message: "Product create successfully",
            success: true,
            product
        });
    } catch (err) {
        next(err);
    }
}