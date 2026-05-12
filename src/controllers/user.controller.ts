import type { Request, Response } from "express";
import { UserService } from "../services/user.service.js";

const userService = new UserService();

export const register = async (req: Request, res: Response) => {
  try {
    await userService.registerUser(req.body);
    res.status(201).json({ message: "User created successfully" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
