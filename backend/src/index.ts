import express from 'express';
import cors from 'cors';
import { ENV } from './config/env';
import { clerkMiddleware } from '@clerk/express'

const app = express();

app.use(cors({origin:ENV.FRONTEND_URL})); //enable cors for frontend url
app.use(clerkMiddleware()); //auth obj wil be attached to the req
app.use(express.json()); //pareses json body
app.use(express.urlencoded({ extended: true }));// parses form data

app.get("/", (req, res) => {
    
    res.json({ message:"Welcome to SELLIFY API - Powered by PostgreSQL,Drizzle ORM & Clerk Auth",
        endpoints:{
            users:"/api/users",
            products:"/api/products",
            Comments:"/api/comments",
        },
     });
})

app.listen(ENV.PORT, () => console.log("Server is running on port:",ENV.PORT));