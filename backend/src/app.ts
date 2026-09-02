import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env.js";
import authRoutes from "./modules/auth/auth.routes.js";
import customerRoutes from "./modules/customer/customer.routes.js";
import businessRoutes from "./modules/business/business.routes.js";
import riderRoutes from "./modules/rider/rider.routes.js";
import platformRoutes from "./modules/platform/platform.routes.js";

export const app = express();
app.use(helmet());
app.use(cors({ origin: env.clientUrl, credentials: true }));
app.use(express.json());
app.use(morgan("dev"));
app.get("/api/health", (_req, res) => res.json({ success: true, message: "PickupPro API is running" }));
app.use("/api/auth", authRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/business", businessRoutes);
app.use("/api/rider", riderRoutes);
app.use("/api/platform", platformRoutes);
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  if (err.name === "ZodError") return res.status(400).json({ message: "Validation failed", errors: err.issues });
  return res.status(500).json({ message: "Internal server error" });
});