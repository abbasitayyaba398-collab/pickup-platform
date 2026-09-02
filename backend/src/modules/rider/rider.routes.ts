import { Router } from "express";
import {
  authenticate,
} from "../../middleware/auth.middleware.js";
import {
  authorize,
} from "../../middleware/role.middleware.js";
import { UserRole } from "../auth/user.model.js";
import { RiderProfile } from "./rider.model.js";

const router = Router();

router.use(authenticate);

router.get(
  "/me",
  authorize(UserRole.RIDER),
  async (req: any, res) => {
    const rider = await RiderProfile.findOne({
      userId: req.user.id,
    });

    res.json({
      rider,
    });
  }
);

router.put(
  "/me",
  authorize(UserRole.RIDER),
  async (req: any, res) => {
    const rider =
      await RiderProfile.findOneAndUpdate(
        {
          userId: req.user.id,
        },
        {
          $set: req.body,
        },
        {
          new: true,
          runValidators: true,
        }
      );

    res.json({
      message: "Rider profile updated",
      rider,
    });
  }
);

export default router;