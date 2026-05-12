import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { UserRepository } from "../repositories/user.repository.js";

dotenv.config();

const userRepository = new UserRepository();

export class AuthService {
  private generateTokens(payload: object) {
    const accessToken = jwt.sign(
      payload,
      String(process.env.ACCESS_TOKEN_SECRET),
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY as any,
      },
    );

    const refreshToken = jwt.sign(
      payload,
      String(process.env.REFRESH_TOKEN_SECRET),
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY as any,
      },
    );

    return { accessToken, refreshToken };
  }

  async login(userName: string, pass: string) {
    const user = await userRepository.findByUsername(userName);
    if (!user) throw new Error("Invalid credentials");

    if (user.status === "DEACTIVATED")
      throw new Error("Account is deactivated");

    const isMatch = await bcrypt.compare(pass, user.password!);
    if (!isMatch) throw new Error("Invalid credentials");

    const payload = { userid: user.userid, role: user.role };
    const tokens = this.generateTokens(payload);

    return {
      ...tokens,
      user: {
        userid: user.userid,
        user_name: user.user_name,
        display_name: user.display_name,
        role: user.role,
        status: user.status,
      },
    };
  }

  async refreshAccessToken(refreshToken: string) {
    try {
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET!,
      ) as any;

      const newAccessToken = jwt.sign(
        { userid: decoded.userid, role: decoded.role },
        process.env.ACCESS_TOKEN_SECRET as string,
        {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRY as any,
        },
      );

      return newAccessToken;
    } catch (error) {
      // If refresh token is expired or invalid, this throws
      throw new Error("REFRESH_TOKEN_EXPIRED");
    }
  }
}
