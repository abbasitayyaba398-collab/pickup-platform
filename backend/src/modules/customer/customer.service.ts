import { User } from "../auth/user.model.js";
import { CustomerProfile } from "./customer.model.js";
import { Business } from "../business/business.model.js";

export async function getMyProfile(userId: string) {
  const user = await User.findById(userId).select(
    "-passwordHash"
  );

  if (!user) {
    throw new Error("USER_NOT_FOUND");
  }

  const profile = await CustomerProfile.findOne({
    userId,
  });

  const business = await Business.findOne({
    customerId: userId,
  });

  return {
    user,
    profile,
    business,
  };
}

export async function updateProfile(
  userId: string,
  data: any
) {
  return CustomerProfile.findOneAndUpdate(
    { userId },
    {
      $set: data,
    },
    {
      new: true,
      upsert: true,
      runValidators: true,
    }
  );
}