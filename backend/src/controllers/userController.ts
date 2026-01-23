import type { Request,Response } from "express";
import * as queries from "../db/queries";
import {getAuth} from "@clerk/express";


export async function syncUser(req:Request,res:Response) {
 try{
    const {userId} = getAuth(req);
    if(!userId){
        return res.status(401).json({message:"Unauthorized"});
    }

    const {email,name,imageUrl} = req.body;

    if(!email || !name || !imageUrl){
        return res.status(400).json({message:"Missing required fields: email or name or imageUrl"});
    }

    const user = await queries.upsertUser({
        id:userId,
        email,
        name,
        imageUrl:imageUrl,
    });
    res.status(200).json({message:"User synced successfully",user});

 }catch(err){
    console.error("Error syncing user:",err);
    res.status(500).json({message:"Internal Server Error"});
 }
    

}