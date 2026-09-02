// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { User, UserRole } from "./user.model.js";
// import { env } from "../../config/env.js";
// import { CustomerProfile } from "../customer/customer.model.js";
// import { Business } from "../business/business.model.js";

// function sanitizeUser(user: any) {
//   return {
//     id: user.id,
//     name: user.name,
//     email: user.email,
//     phone: user.phone,
//     role: user.role,
//     isActive: user.isActive,
//     emailVerified: user.emailVerified,
//   };
// }

// function createAccessToken(userId: string, role: UserRole) {
//   return jwt.sign(
//     {
//       sub: userId,
//       role,
//     },
//     env.jwtAccessSecret,
//     {
//       expiresIn: "15m",
//     }
//   );
// }

// function createRefreshToken(userId: string) {
//   return jwt.sign(
//     {
//       sub: userId,
//     },
//     env.jwtRefreshSecret,
//     {
//       expiresIn: "30d",
//     }
//   );
// }

// export async function registerCustomer(data: {
//   name: string;
//   email: string;
//   password: string;
//   phone?: string;
//   businessName?: string;
// }) {
//   const email = data.email.toLowerCase().trim();

//   const existing = await User.findOne({ email });

//   if (existing) {
//     throw new Error("EMAIL_ALREADY_REGISTERED");
//   }

//   const passwordHash = await bcrypt.hash(data.password, 12);

//   const user = await User.create({
//     name: data.name,
//     email,
//     passwordHash,
//     phone: data.phone,
//     role: UserRole.CUSTOMER,
//   });

//   if (data.businessName) {
//     await Business.create({
//       customerId: user._id,

//       businessName: data.businessName,

//       address: {
//         addressLine1: "",
//         city: "",
//         country: "Pakistan",
//       },
//     });
//   }

//   return {
//     user: sanitizeUser(user),
//   };
// }

// export async function login(
//   emailInput: string,
//   password: string
// ) {
//   const email = emailInput.toLowerCase().trim();

//   const user = await User.findOne({ email }).select("+passwordHash");

//   if (!user || !user.isActive) {
//     throw new Error("INVALID_CREDENTIALS");
//   }

//   const valid = await bcrypt.compare(
//     password,
//     user.passwordHash
//   );

//   if (!valid) {
//     throw new Error("INVALID_CREDENTIALS");
//   }

//   user.lastLoginAt = new Date();

//   await user.save();

//   return {
//     user: sanitizeUser(user),

//     accessToken: createAccessToken(
//       user.id,
//       user.role
//     ),

//     refreshToken: createRefreshToken(user.id),
//   };
// }





import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User, UserRole } from "./user.model.js";
import { env } from "../../config/env.js";
import { CustomerProfile } from "../customer/customer.model.js";
import { Business } from "../business/business.model.js";

function sanitizeUser(user: any) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    isActive: user.isActive,
    emailVerified: user.emailVerified,
  };
}

function createAccessToken(userId: string, role: UserRole) {
  return jwt.sign(
    {
      sub: userId,
      role,
    },
    env.jwtAccessSecret,
    {
      expiresIn: "15m",
    }
  );
}

function createRefreshToken(userId: string) {
  return jwt.sign(
    {
      sub: userId,
    },
    env.jwtRefreshSecret,
    {
      expiresIn: "30d",
    }
  );
}

export async function registerCustomer(data: {
  name: string;
  email: string;
  password: string;
  phone?: string;
  businessName?: string;
}) {
  const email = data.email.toLowerCase().trim();

  const existing = await User.findOne({ email });

  if (existing) {
    throw new Error("EMAIL_ALREADY_REGISTERED");
  }

  const passwordHash = await bcrypt.hash(data.password, 12);

  const user = await User.create({
    name: data.name,
    email,
    passwordHash,
    phone: data.phone,
    role: UserRole.CUSTOMER,
  });

  if (data.businessName) {
    await Business.create({
      customerId: user._id,

      businessName: data.businessName,

      address: {
        country: "Pakistan",
      },
    });
  }

  return {
    user: sanitizeUser(user),
  };
}

export async function login(
  emailInput: string,
  password: string
) {
  const email = emailInput.toLowerCase().trim();

  const user = await User.findOne({ email }).select("+passwordHash");

  if (!user || !user.isActive) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const valid = await bcrypt.compare(
    password,
    user.passwordHash
  );

  if (!valid) {
    throw new Error("INVALID_CREDENTIALS");
  }

  user.lastLoginAt = new Date();

  await user.save();

  return {
    user: sanitizeUser(user),

    accessToken: createAccessToken(
      user.id,
      user.role
    ),

    refreshToken: createRefreshToken(user.id),
  };
}