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
            seller: seller.id
        });
        return res.status(201).json({ message: "Product create successfully", success: true, product });
    } catch (err) {
        next(err);
    }
}

export const getSellerProducts = async (req, res, next) => {
    try {
        const seller = req.user;
        const products = await productModel.find({ seller: seller._id });
        return res.status(200).json({ message: "Products fetched successfully", success: true, products });
    } catch (err) {
        next(err);
    }
}

export const getAllProduct = async (req, res, next) => {
    try {
        const products = await productModel.find();
        return res.status(200).json({ message: "Products fetched successfully", success: true, products });
    } catch (err) {
        next(err);
    }
}