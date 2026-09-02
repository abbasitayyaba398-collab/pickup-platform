import { Schema, model, type Document, Types } from "mongoose";

export interface ICustomerProfile extends Document {
  userId: Types.ObjectId;

  defaultContact: {
    fullName: string;
    phone: string;
    email?: string;
  };

  defaultPickupAddress: {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state?: string;
    postalCode?: string;
    country: string;
  };

  notes?: string;

  createdAt: Date;
  updatedAt: Date;
}

const customerSchema = new Schema<ICustomerProfile>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },

    defaultContact: {
      fullName: {
        type: String,
        required: true,
      },

      phone: {
        type: String,
        required: true,
      },

      email: String,
    },

    defaultPickupAddress: {
      addressLine1: {
        type: String,
        required: true,
      },

      addressLine2: String,

      city: {
        type: String,
        required: true,
      },

      state: String,

      postalCode: String,

      country: {
        type: String,
        required: true,
        default: "Pakistan",
      },
    },

    notes: String,
  },
  {
    timestamps: true,
  }
);

export const CustomerProfile = model<ICustomerProfile>(
  "CustomerProfile",
  customerSchema
);