import { Schema, model, type Document } from "mongoose";

export type PlatformResource =
  | "pickup-plans" | "pickups" | "carriers" | "coverage-areas" | "addon-services"
  | "pricing" | "payments" | "notifications" | "reports" | "settings" | "audit-logs"
  | "addresses" | "payment-methods" | "invoices" | "support" | "profiles";

export interface IPlatformRecord extends Document {
  resource: PlatformResource;
  ownerId?: Schema.Types.ObjectId;
  createdBy?: Schema.Types.ObjectId;
  title: string;
  status: string;
  data: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

const schema = new Schema<IPlatformRecord>({
  resource: { type: String, required: true, index: true },
  ownerId: { type: Schema.Types.ObjectId, ref: "User", index: true },
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  title: { type: String, required: true, trim: true },
  status: { type: String, default: "ACTIVE", trim: true },
  data: { type: Schema.Types.Mixed, default: {} },
}, { timestamps: true });

schema.index({ resource: 1, createdAt: -1 });
export const PlatformRecord = model<IPlatformRecord>("PlatformRecord", schema);