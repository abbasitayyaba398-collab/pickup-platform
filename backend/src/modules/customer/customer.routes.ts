import { Router } from "express";
import {
  authenticate,
} from "../../middleware/auth.middleware.js";
import {
  authorize,
} from "../../middleware/role.middleware.js";
import { UserRole } from "../auth/user.model.js";
import {
  getProfile,
  updateProfile,
} from "./customer.controller.js";

const router = Router();

router.use(authenticate);

router.get(
  "/me",
  authorize(UserRole.CUSTOMER),
  getProfile
);

router.put(
  "/me",
  authorize(UserRole.CUSTOMER),
  updateProfile
);

export default router;