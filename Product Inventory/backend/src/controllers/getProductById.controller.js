import mongoose from "mongoose";
import Products from "../models/product.models.js";

// Get Product by ID
export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate MongoDB Id
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Product ID",
            });
        }

        // Find the Product
        const product = await Products.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Invalid Product Id or Product not Found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product fetch successfully",
            product,
        });
    } catch (error) {
        console.log("Error in fetching Product", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

export default getProductById;
