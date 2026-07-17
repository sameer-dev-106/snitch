import { stockOfVariant } from "../dao/product.dao.js";
import cartModel from "../models/cart.model.js";
import productModel from "../models/product.model.js";

export const addToCart = async (req, res, next) => {
    try {
        const { productId, variantsId } = req.params;
        const { quantity = 1 } = req.body;
        const product = await productModel.findOne({ _id: productId, "variants._id": variantsId });
        if (!product) return res.status(404).json({ message: "Product or variant not found", success: false });
        const stock = await stockOfVariant(productId, variantsId);
        const cart = (await cartModel.findOne({ user: req.user._id })) || await cartModel.create({ user: req.user._id });
        const isProductAlreadyInCart = cart.items.some(item => item.product.toString() === productId && item.variant.toString() === variantsId);
        if (isProductAlreadyInCart) {
            const quantityInCart = cart.items.find(item => item.product.toString() === productId && item.variant?.toString() === variantsId()).quantity;
            if (quantityInCart + quantity > stock) {
                return res.status(400).json({
                    message: `Only ${stock} items left in stock. and you already have ${quantityInCart} items in your cart`,
                    success: false
                });
            }
            await cartModel.findOneAndUpdate(
                { user: req.user._id, "items.product": productId, "items.variant": variantsId },
                { $inc: { "items.$.quantity": quantity } },
                { new: true }
            );
            return res.status(200).json({ message: "Cart updated successfully", success: true });
        }
        if (quantity > stock) return res.status(400).json({ message: `Only ${stock} items left in stock`, success: false });
        cart.items.push({ product: productId, variant: variantsId, quantity, price: product.price });
        await cart.save();
        return res.status(200).json({ message: "Product added to cart successfully", success: true });
    } catch (err) {
        next(err);
    }
}