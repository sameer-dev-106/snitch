import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import { config } from "../config/config.js";

async function sendTokenResponse(user, res, message) {
    const token = jwt.sign({ id: user._id }, config.JWT_SECRET, { expiresIn: "7d" });
    res.cookie("token", token);
    res.status(200).json({
        message,
        success: true,
        user: {
            id: user._id,
            email: user.email,
            contact: user.contact,
            fullname: user.fullname,
            role: user.role
        }
    });
}

export const register = async (req, res, next) => {
    try {
        const { email, contact, password, fullname, isSeller } = req.body;
        const existingUser = await userModel.findOne({ $or: [{ email }, { contact }] });
        if (existingUser) {
            let message = "User already exists";
            const emailMatch = existingUser.email === email;
            const contactNumberMatch = existingUser.contact === contact;
            if (emailMatch && contactNumberMatch) message += " with this email and contact number";
            else if (emailMatch) message += " with this email address";
            else if (contactNumberMatch) message += " with this contact number";
            return res.status(409).json({ message, success: false, err: message });
        }
        const user = await userModel.create({ email, contact, password, fullname, role: isSeller ? "seller" : "buyer" });
        await sendTokenResponse(user, res, "User registered successfully");
    } catch (err) {
        next(err);
    }
}

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid email or password", success: false, err: "User not found" });
        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: "Invalid password", success: false, err: "User not found" });
        await sendTokenResponse(user, res, "Login successful");
    } catch (err) {
        next(err);
    }
}

export const googleCallBack = async (req, res, next) => {
    try {
        if (!req.user) return res.redirect(config.NODE_ENV == "development" ? `${config.FRONTEND_URL}/login` : "/login");
        const { id, displayName, emails, photos } = req.user;
        const email = emails?.[0]?.value;
        const photo = photos?.[0]?.value;
        if (!email) return res.redirect(`${config.FRONTEND_URL}/login`);
        let user = await userModel.findOne({ email });
        if (!user) user = await userModel.create({ email, googleId: id, fullname: displayName });
        const token = jwt.sign({ id: user._id }, config.JWT_SECRET, { expiresIn: "7d" });
        res.cookie("token", token);
        return res.redirect(config.FRONTEND_URL);
    } catch (err) {
        next(err);
        return res.redirect(config.NODE_ENV == "development" ? `${config.FRONTEND_URL}/login` : "/login");
    }
}

export const getMe = async (req, res, next) => {
    try {
        const user = req.user;
        res.status(200).json({
            message: "User fetched successfully",
            success: true,
            user: {
                id: user.id,
                email: user.email,
                contact: user.contact,
                fullname: user.fullname,
                role: user.role
            }
        })
    } catch (err) {
        next(err);
    }
}