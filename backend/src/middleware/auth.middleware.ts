import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { User, UserRole } from "../modules/auth/user.model.js";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: UserRole;
  };
}

export async function authenticate(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const header = req.headers.authorization;

    if (!header?.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    const token = header.substring(7);

    const payload = jwt.verify(token, env.jwtAccessSecret) as {
      sub: string;
      role: UserRole;
    };

    const user = await User.findById(payload.sub);

    if (!user || !user.isActive) {
      return res.status(401).json({
        message: "User account is inactive or does not exist",
      });
    }

    req.user = {
      id: user.id,
      role: user.role,
    };

    next();
  } catch {
    return res.status(401).json({
      message: "Invalid or expired access token",
    });
  }
}