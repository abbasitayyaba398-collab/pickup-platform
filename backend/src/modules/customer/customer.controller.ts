import type { Response } from "express";
import type { AuthRequest } from "../../middleware/auth.middleware.js";
import * as service from "./customer.service.js";

export async function getProfile(
  req: AuthRequest,
  res: Response
) {
  const result = await service.getMyProfile(
    req.user!.id
  );

  res.json(result);
}

export async function updateProfile(
  req: AuthRequest,
  res: Response
) {
  const result = await service.updateProfile(
    req.user!.id,
    req.body
  );

  res.json({
    message: "Profile updated successfully",
    profile: result,
  });
}