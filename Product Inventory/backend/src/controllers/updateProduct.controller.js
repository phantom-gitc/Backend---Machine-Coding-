import mongoose from "mongoose";
import Products from "../models/product.models.js";

// Update Product 

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate Mongo DB ID 

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Product ID "
            });
        }

        // Fields Allowd to update 

        const allowedFields = [
            "name",
            "description",
            "price",
            "category",
            "stock"
        ];

        const updates = {};

        allowedFields.forEach((field) => {
            if (req.body[field] !== undefined) {
                updates[field] = req.body[field];
            }
        });

        // Validate name 

        if (updates.name !== undefined && !updates.name.trim()) {
            return res.status(400).json({
                success: false,
                message: "Product name is required"
            });
        }

        const product = await Products.findByIdAndUpdate(
            id, updates, { new: true }
        );

        // Product not found 

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product
        });
    } catch (error) {
        console.log("Error in updating Product", error);
        res.status(500).json({
            success: false,
            message: "Internal Server error",
            error: error.message
        });
    }
};

export default updateProduct;
