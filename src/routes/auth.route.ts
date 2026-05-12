import {
  Router,
  type Request,
  type Response,
  type NextFunction,
} from "express";
import { login, refresh } from "../controllers/auth.controller.js";

const router = Router();

const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const { user_name, password } = req.body;
  if (!user_name || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }
  next();
};

const validateRefresh = (req: Request, res: Response, next: NextFunction) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(400).json({ error: "Refresh token is required" });
  }
  next();
};

router.post("/login", validateLogin, login);
router.post("/refresh", validateRefresh, refresh);

export default router;
