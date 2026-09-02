import { Schema, model, type Document, Types } from "mongoose";

export enum RiderStatus {
  AVAILABLE = "AVAILABLE",
  BUSY = "BUSY",
  OFFLINE = "OFFLINE",
  SUSPENDED = "SUSPENDED",
}

export interface IRiderProfile extends Document {
  userId: Types.ObjectId;

  riderCode: string;

  vehicleType?: string;
  vehicleNumber?: string;

  status: RiderStatus;

  emergencyContact?: {
    name: string;
    phone: string;
    relationship?: string;
  };

  createdAt: Date;
  updatedAt: Date;
}

const riderSchema = new Schema<IRiderProfile>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },

    riderCode: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    vehicleType: String,

    vehicleNumber: String,

    status: {
      type: String,
      enum: Object.values(RiderStatus),
      default: RiderStatus.OFFLINE,
      index: true,
    },

    emergencyContact: {
      name: String,
      phone: String,
      relationship: String,
    },
  },
  {
    timestamps: true,
  }
);

export const RiderProfile = model<IRiderProfile>(
  "RiderProfile",
  riderSchema
);