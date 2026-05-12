import type { Request, Response } from "express";
import { AuthService } from "../services/auth.service.js";
import { sendResponse } from "../utils/response.util.js";

const authService = new AuthService();

export const login = async (req: Request, res: Response) => {
  try {
    const { user_name, password } = req.body;
    const tokens = await authService.login(user_name, password);

    return sendResponse(res, {
      data: tokens,
    });
  } catch (err: any) {
    return sendResponse(res, {
      message: err.message,
      error: err,
    });
  }
};

export const refresh = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    const accessToken = await authService.refreshAccessToken(refreshToken);

    return sendResponse(res, {
      data: { accessToken },
    });
  } catch (err: any) {
    if (err.message === "REFRESH_TOKEN_EXPIRED") {
      return sendResponse(res, {
        returncode: "301",
        message: "Token Expired",
      });
    }

    return sendResponse(res, {
      message: "Invalid Refresh Token",
      error: err,
    });
  }
};
