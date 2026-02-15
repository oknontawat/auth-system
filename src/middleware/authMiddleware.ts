import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "fallback_secret";
interface TokenPayload { id: string; role: string; }

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "No token provided" });
  try {
    const decoded = jwt.verify(token, SECRET) as TokenPayload;
    (req as any).user = decoded;
    next();
  } catch (err) { return res.status(401).json({ msg: "Invalid token" }); }
};

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user;
  if (user?.role !== "admin") return res.status(403).json({ msg: "Access denied" });
  next();
};
