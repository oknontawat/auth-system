import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { users, User } from "../models/user";
import { hashPassword, comparePassword } from "../utils/hash";
const SECRET = "MY_SECRET_KEY";
export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const exists = users.find(u => u.email === email);
  if (exists) return res.status(400).json({ msg: "User already exists" });
  const hashed = await hashPassword(password);
  const newUser: User = { id: users.length + 1, name, email, password: hashed, role: "user" };
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
