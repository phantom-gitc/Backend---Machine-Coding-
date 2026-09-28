import Products from "../models/product.models.js";

// Create Product controller 

export const createProduct = async (req, res) => {
    try {
        const { name, description, price, stock, category } = req.body;

        if (!name || !description || !price || !stock) {
            return res.status(400).json({
                error: "All fields are required "
            });
        }

        if (!category || category.trim() === "") {
            return res.status(400).json({
                error: "Category is required "
            });
        }

        const product = await Products.create({
            name,
            description,
            price,
            stock,
            category
        });

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            product
        });
    } catch (error) {
        console.log("Error in creating product ", error);
        res.status(500).json({
            success: false,
            message: "Error in creating product",
            error: error.message
        });
    }
};

export default createProduct;
