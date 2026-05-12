import type { Response } from "express";

export const sendResponse = (
  res: Response,
  {
    returncode = "300",
    message = "Success",
    data = null,
    error = null,
  }: {
    returncode?: string;
    message?: string;
    data?: any;
    error?: any;
  },
) => {
  return res.status(200).json({
    returncode,
    message,
    data,
    error: process.env.NODE_ENV === "development" ? error : undefined,
  });
};
