import type { Request, Response } from "express";

import * as queries from "../db/queries";

import { getAuth } from "@clerk/express";

// Create a new comment for a product

export const createComment = async (req: Request, res: Response) => {
    try{
        const {userId} = getAuth(req);
        if(!userId){
            return res.status(401).json({message:"Unauthorized"});
        }
        const productId = req.params.productId as string;
        const {content} = req.body;

        if(!content || content.trim() === ""){
            return res.status(400).json({message:"Content is required"});
        }
        // Check if product exists
        const product = await queries.getProductById(productId);
        if(!product){
            return res.status(404).json({message:"Product not found"});
        }
        const comment = await queries.createComment({
            content,
            productId,
            userId,
    });
    res.status(201).json({message:"Comment created successfully", comment});
    }catch(error){
        console.error("Error creating comment:", error);
        res.status(500).json({message:"Internal server error"});
    }
};

// Delete a comment by ID

export const deleteComment = async (req: Request, res: Response) => {
    try{
        const {userId} = getAuth(req);
        if(!userId){
            return res.status(401).json({message:"Unauthorized"});
        }
        const commentId = req.params.commentId as string;
        //check if comment exists
        const comment = await queries.getCommentById(commentId);
        if(!comment){
            return res.status(404).json({message:"Comment not found"});
        }
        //check if the user is the owner of the comment
        if(comment.userId !== userId){
            return res.status(403).json({message:"Forbidden"});
        }
        await queries.deleteComment(commentId);
        res.status(200).json({message:"Comment deleted successfully"});
    }catch(error){
        console.error("Error deleting comment:", error);
        res.status(500).json({message:"Internal server error"});
    }
};