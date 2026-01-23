import { Router } from "express";
import * as productController from "../controllers/productController";
import { requireAuth } from "@clerk/express";


const router = Router();

//get /api/products/ - Get all products
router.get("/",productController.getAllProducts);
//get /api/products/:id - Get product by id
router.get("/:id", productController.getProductById);
//get /api/products/my-products - Get products by user id - protected route
router.get("/my", requireAuth(), productController.getMyProducts);
//post /api/products/ - Create new product - protected route
router.post("/", requireAuth(), productController.createProduct);
//put /api/products/:id - Update product - protected route
router.put("/:id", requireAuth(), productController.updateProduct);
//delete /api/products/:id - Delete product - protected route
router.delete("/:id", requireAuth(), productController.deleteProduct);

export default router;