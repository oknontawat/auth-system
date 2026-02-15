import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { users, User, passwordResets, PasswordReset } from "../models/user";
import { hashPassword, comparePassword } from "../utils/hash";

const SECRET = process.env.JWT_SECRET || "fallback_secret";

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const exists = users.find(u => u.email === email);
  if (exists) return res.status(400).json({ msg: "User already exists" });
  const hashed = await hashPassword(password);
  const newUser: User = { id: uuidv4(), name, email, password: hashed, role: "user" };
  users.push(newUser);
  res.status(201).json({ msg: "User registered successfully" });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) return res.status(400).json({ msg: "Invalid credentials" });
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
  const token = jwt.sign({ id: user.id, role: user.role }, SECRET, { expiresIn: "1h" });
  res.json({ token });
};

export const requestPasswordReset = async (req: Request, res: Response) => {
  const { email } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) return res.status(400).json({ msg: "User not found" });
  
  const resetToken = uuidv4();
  const expires = new Date(Date.now() + 3600000); // 1 hour
  
  const existingReset = passwordResets.findIndex(r => r.email === email);
  if (existingReset !== -1) {
    passwordResets[existingReset] = { email, token: resetToken, expires };
  } else {
    passwordResets.push({ email, token: resetToken, expires });
  }
  
  res.json({ msg: "Password reset token generated", token: resetToken });
};

export const resetPassword = async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;
  const resetRequest = passwordResets.find(r => r.token === token && r.expires > new Date());
  if (!resetRequest) return res.status(400).json({ msg: "Invalid or expired token" });
  
  const user = users.find(u => u.email === resetRequest.email);
  if (!user) return res.status(400).json({ msg: "User not found" });
  
  user.password = await hashPassword(newPassword);
  const resetIndex = passwordResets.findIndex(r => r.token === token);
  passwordResets.splice(resetIndex, 1);
  
  res.json({ msg: "Password reset successfully" });
};
