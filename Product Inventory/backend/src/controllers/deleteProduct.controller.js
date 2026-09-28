import mongoose from "mongoose";
import Products from "../models/product.models.js";

// Delete Product
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate MongoDB id
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid mongodb id",
            });
        }

        const product = await Products.findByIdAndDelete(id);

        // Product not found
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product Not Found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product Deleted successfully",
        });
    } catch (error) {
        console.log("Error in Deleting Product", error);
        res.status(500).json({
            success: false,
            message: "Internal Server error",
            error: error.message,
        });
    }
};

export default deleteProduct;
