import { Router } from "express";
import { createProduct } from "../controllers/createProduct.controller.js";
import { getProducts } from "../controllers/getProducts.controller.js";
import { getProductById } from "../controllers/getProductById.controller.js";
import { updateProduct } from "../controllers/updateProduct.controller.js";
import { deleteProduct } from "../controllers/deleteProduct.controller.js";

const router = Router();

router.post("/", createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;