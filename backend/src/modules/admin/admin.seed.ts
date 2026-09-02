import bcrypt from "bcryptjs";
import { env } from "../../config/env.js";
import {
  User,
  UserRole,
} from "../auth/user.model.js";

export async function seedAdmin() {
  const email = env.admin.email
    .toLowerCase()
    .trim();

  const existing = await User.findOne({
    email,
  });

  if (existing) {
    console.log(`Admin already exists: ${email}`);
    return;
  }

  const passwordHash =
    await bcrypt.hash(env.admin.password, 12);

  await User.create({
    name: env.admin.name,

    email,

    passwordHash,

    role: UserRole.ADMIN,

    isActive: true,

    emailVerified: true,
  });

  console.log(`Admin created: ${email}`);
}