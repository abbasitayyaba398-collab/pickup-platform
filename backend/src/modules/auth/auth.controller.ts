
import type { Request, Response } from "express";
import {
  loginSchema,
  registerSchema,
} from "./auth.validation.js";
import * as authService from "./auth.service.js";

export async function register(
  req: Request,
  res: Response
) {
  try {
    const data = registerSchema.parse(req.body);

    const result =
      await authService.registerCustomer(data);

    return res.status(201).json(result);
  } catch (error: any) {
    if (error.message === "EMAIL_ALREADY_REGISTERED") {
      return res.status(409).json({
        message: "Email is already registered",
      });
    }

    throw error;
  }
}

export async function login(
  req: Request,
  res: Response
) {
  const data = loginSchema.parse(req.body);

  try {
    const result = await authService.login(
      data.email,
      data.password
    );

    return res.json(result);
  } catch (error: any) {
    if (error.message === "INVALID_CREDENTIALS") {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    throw error;
  }
}