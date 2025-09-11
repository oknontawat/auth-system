import { Request, Response } from "express";
import { users } from "../models/user";
export const getUsers = (req: Request, res: Response) => {
  res.json(users);
};
