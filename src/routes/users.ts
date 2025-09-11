import { Router } from "express";
import { getUsers } from "../controllers/userController";
import { authMiddleware, adminMiddleware } from "../middleware/authMiddleware";
const router = Router();
router.get("/", authMiddleware, adminMiddleware, getUsers);
export default router;
