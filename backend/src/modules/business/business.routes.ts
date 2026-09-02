import { Router } from "express";
import {
  authenticate,
} from "../../middleware/auth.middleware.js";
import {
  authorize,
} from "../../middleware/role.middleware.js";
import { UserRole } from "../auth/user.model.js";
import { Business } from "./business.model.js";

const router = Router();

router.use(authenticate);

router.get(
  "/me",
  authorize(UserRole.CUSTOMER),
  async (req: any, res) => {
    const business = await Business.findOne({
      customerId: req.user.id,
    });

    res.json({
      business,
    });
  }
);

router.put(
  "/me",
  authorize(UserRole.CUSTOMER),
  async (req: any, res) => {
    const business =
      await Business.findOneAndUpdate(
        {
          customerId: req.user.id,
        },
        {
          $set: req.body,
        },
        {
          new: true,
          upsert: true,
          runValidators: true,
        }
      );

    res.json({
      message: "Business profile updated",
      business,
    });
  }
);

export default router;