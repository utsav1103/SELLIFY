import express from 'express';
import { ENV } from './config/env';

const app = express();

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