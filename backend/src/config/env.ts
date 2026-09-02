import "dotenv/config";

function required(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} environment variable is required`);
  }

  return value;
}

export const env = {
  port: Number(process.env.PORT || 5000),

  mongoUri: required("MONGODB_URI"),

  jwtAccessSecret: required("JWT_ACCESS_SECRET"),

  jwtRefreshSecret: required("JWT_REFRESH_SECRET"),

  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",

  admin: {
    email: required("ADMIN_EMAIL"),
    password: required("ADMIN_PASSWORD"),
    name: process.env.ADMIN_NAME || "System Administrator",
  },
};