import Products from "../models/product.models.js";

// Get All Products Controller

export const getProducts = async (req, res) => {
    try {
        const products = await Products.find();

        return res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            products,
        });
    } catch (error) {
        console.log("Error in fetching products", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

export default getProducts;
