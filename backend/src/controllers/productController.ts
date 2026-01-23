import type { Request, Response } from "express";

import * as queries from "../db/queries";
import { getAuth } from "@clerk/express";

//get all products

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await queries.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

//get product by id

export const getProductById = async (req: Request, res: Response) => {
    try {
        // not using const {id} = req.params bcuz req.params is of type string | ParsedQs
        const id  = req.params.id as string;
        const product = await queries.getProductById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

//get products by user id // protected route
export const getMyProducts = async (req: Request, res: Response) => {
    try {
       const { userId } = getAuth(req);
       if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
       }
        const products = await queries.getProductByUserId(userId);
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products by user id:", error);
        res.status(500).json({ message: "Internal server error" });
    }   
};

//Create new product - protected route
export const createProduct = async (req: Request, res: Response) => {
    try {
        const { userId } = getAuth(req);
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const { title, description, imageUrl } = req.body;
        if (!title || !description || !imageUrl) {
            return res.status(400).json({ message: "All fields are required" });
            return;
        }
        const product = await queries.createProduct({
            title,
            description,
            imageUrl,
            userId,
        });
        res.status(201).json(product);
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

//Update product - protected route
export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { userId } = getAuth(req);
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const id = req.params.id as string;
        const existingProduct = await queries.getProductById(id);
        if (!existingProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        if (existingProduct.userId !== userId) {
            return res.status(403).json({ message: "Forbidden" });
        }
        const { title, description, imageUrl } = req.body;
        const product = await queries.updateProduct(id, {
            title,
            description,
            imageUrl,
        });
        res.status(200).json(product);
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

//Delete product - protected route
export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { userId } = getAuth(req);
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const id = req.params.id as string;
        const existingProduct = await queries.getProductById(id);
        if (!existingProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        if (existingProduct.userId !== userId) {
            return res.status(403).json({ message: "Forbidden" });
        }
        await queries.deletProduct(id);
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};