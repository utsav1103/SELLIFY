import { Router } from "express";
import { syncUser } from "../controllers/userController";
import { requireAuth } from "@clerk/express";

const router = Router();


// /api/users/sync - Sync users from Clerk to the database

router.post("/sync", requireAuth(), syncUser)

export default router;