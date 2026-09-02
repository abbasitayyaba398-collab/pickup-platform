import { Router } from "express";
import { z } from "zod";
import { authenticate, type AuthRequest } from "../../middleware/auth.middleware.js";
import { authorize } from "../../middleware/role.middleware.js";
import { User, UserRole } from "../auth/user.model.js";
import { PlatformRecord } from "./platform.model.js";

const router = Router();
const resources = new Set(["pickup-plans","pickups","carriers","coverage-areas","addon-services","pricing","payments","notifications","reports","settings","audit-logs","addresses","payment-methods","invoices","support","profiles"]);
const bodySchema = z.object({ title: z.string().min(1).max(150), status: z.string().optional(), data: z.record(z.string(), z.unknown()).optional(), ownerId: z.string().optional() });

function scope(req: AuthRequest, resource: string) {
  if (req.user?.role === UserRole.ADMIN) return {};
  if (req.user?.role === UserRole.RIDER && resource === "pickups") return { "data.riderId": req.user.id };
  if (req.user?.role === UserRole.RIDER) return { ownerId: req.user?.id };
  if (resource === "notifications" || resource === "invoices" || resource === "profiles" || resource === "addresses" || resource === "payment-methods" || resource === "support" || resource === "pickups" || resource === "payments") return { ownerId: req.user?.id };
  return {};
}

router.get("/users", authenticate, authorize(UserRole.ADMIN), async (_req, res, next) => {
  try { const users = await User.find().select("-passwordHash").sort({ createdAt: -1 }); res.json({ success: true, users }); } catch (e) { next(e); }
});

router.patch("/users/:id", authenticate, authorize(UserRole.ADMIN), async (req, res, next) => {
  try {
    const schema = z.object({ role: z.nativeEnum(UserRole).optional(), isActive: z.boolean().optional() });
    const input = schema.parse(req.body);
    const user = await User.findByIdAndUpdate(req.params.id, input, { new: true }).select("-passwordHash");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ success: true, user });
  } catch (e) { next(e); }
});

router.get("/:resource", authenticate, async (req: AuthRequest, res, next) => {
  try {
    if (!resources.has(req.params.resource)) return res.status(404).json({ message: "Resource not found" });
    const records = await PlatformRecord.find({ resource: req.params.resource, ...scope(req, req.params.resource) }).sort({ createdAt: -1 });
    res.json({ success: true, records });
  } catch (e) { next(e); }
});

router.post("/:resource", authenticate, async (req: AuthRequest, res, next) => {
  try {
    const resource = req.params.resource;
    if (!resources.has(resource)) return res.status(404).json({ message: "Resource not found" });
    if (req.user?.role === UserRole.RIDER && !["profiles","notifications"].includes(resource)) return res.status(403).json({ message: "Riders can only manage their profile and notifications" });
    const input = bodySchema.parse(req.body);
    const data = { ...(input.data || {}) } as Record<string, unknown>;
    if (resource === "pickups" && req.user?.role === UserRole.RIDER) data.riderId = req.user.id;
    const ownerId = req.user?.role === UserRole.ADMIN ? input.ownerId : req.user?.id;
    const record = await PlatformRecord.create({ resource, ownerId, createdBy: req.user?.id, title: input.title, status: input.status || "ACTIVE", data });
    res.status(201).json({ success: true, record });
  } catch (e) { next(e); }
});

router.patch("/:resource/:id", authenticate, async (req: AuthRequest, res, next) => {
  try {
    const resource = req.params.resource;
    if (!resources.has(resource)) return res.status(404).json({ message: "Resource not found" });
    const input = bodySchema.partial().parse(req.body);
    const filter = { _id: req.params.id, resource, ...scope(req, resource) };
    const update: Record<string, unknown> = {};
    if (input.title !== undefined) update.title = input.title;
    if (input.status !== undefined) update.status = input.status;
    if (input.data !== undefined) update.data = input.data;
    if (req.user?.role === UserRole.RIDER && resource === "pickups" && input.data) update.data = { ...(input.data as Record<string, unknown>), riderId: req.user.id };
    const record = await PlatformRecord.findOneAndUpdate(filter, update, { new: true });
    if (!record) return res.status(404).json({ message: "Record not found or not accessible" });
    res.json({ success: true, record });
  } catch (e) { next(e); }
});

router.delete("/:resource/:id", authenticate, authorize(UserRole.ADMIN), async (req, res, next) => {
  try {
    if (!resources.has(req.params.resource)) return res.status(404).json({ message: "Resource not found" });
    const record = await PlatformRecord.findOneAndDelete({ _id: req.params.id, resource: req.params.resource });
    if (!record) return res.status(404).json({ message: "Record not found" });
    res.json({ success: true, message: "Record deleted" });
  } catch (e) { next(e); }
});

export default router;