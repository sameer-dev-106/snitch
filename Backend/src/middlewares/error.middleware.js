import { config } from "../config/config.js";

function handleError(err, req, res, next) {
    const response = { success: false, message: err.message || "Internal Server Error", };
    if (config.NODE_ENV == "development") { response.stack = err.stack; }
    res.status(err.status || 500).json(response);
}

export default handleError;
