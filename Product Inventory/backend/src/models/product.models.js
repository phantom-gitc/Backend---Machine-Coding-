import mongoose from "mongoose";



const productSchema = mongoose.Schema({

    name: {
        type: String,
        required: [true, "Product name is required"],
        trim: true,
        minLength: [3, "Product name must be at least 3 characters long"],
        maxLength: [100, "Product name cannot exceed 100 characters"]
    },

    description: {
        type: String,
        trim: true,
        maxLength: [500, "Product description cannot exceed 500 characters"]
    },

    price: {
        type: Number,
        required: [true, "Product price is required"],
        trim: true,
        min: [0, "Product price cannot be negative"]
    },
    category : {
        type : String,
        required : [true, "Category is required"],
        enum : ["Electronics" , "Clothing" , "Books" , "Groceries" , "Home & Kitchen"]
    },

    stock: {
        type: Number,
        required: [true, "Product stock is required"],
        trim: true,
        min: [0, "Product stock cannot be negative"],
    }


}, {
    timestamps: true
});



const Products = mongoose.model("products", productSchema);


export default Products;