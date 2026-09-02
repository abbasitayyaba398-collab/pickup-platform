// import { Schema, model, type Document, Types } from "mongoose";

// export interface IBusiness extends Document {
//   customerId: Types.ObjectId;

//   businessName: string;
//   businessType?: string;

//   registrationNumber?: string;
//   taxNumber?: string;

//   email?: string;
//   phone?: string;
//   website?: string;

//   address: {
//     addressLine1: string;
//     addressLine2?: string;
//     city: string;
//     state?: string;
//     postalCode?: string;
//     country: string;
//   };

//   createdAt: Date;
//   updatedAt: Date;
// }

// const businessSchema = new Schema<IBusiness>(
//   {
//     customerId: {
//       type: Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//       unique: true,
//       index: true,
//     },

//     businessName: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     businessType: String,

//     registrationNumber: String,

//     taxNumber: String,

//     email: String,

//     phone: String,

//     website: String,

//     address: {
//       addressLine1: {
//         type: String,
//         required: true,
//       },

//       addressLine2: String,

//       city: {
//         type: String,
//         required: true,
//       },

//       state: String,

//       postalCode: String,

//       country: {
//         type: String,
//         required: true,
//         default: "Pakistan",
//       },
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// export const Business = model<IBusiness>("Business", businessSchema);



import { Schema, model, type Document, Types } from "mongoose";

export interface IBusiness extends Document {
  customerId: Types.ObjectId;

  businessName: string;
  businessType?: string;

  registrationNumber?: string;
  taxNumber?: string;

  email?: string;
  phone?: string;
  website?: string;

  address: {
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country: string;
  };

  createdAt: Date;
  updatedAt: Date;
}

const businessSchema = new Schema<IBusiness>(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },

    businessName: {
      type: String,
      required: true,
      trim: true,
    },

    businessType: String,

    registrationNumber: String,

    taxNumber: String,

    email: String,

    phone: String,

    website: String,

    address: {
      addressLine1: {
        type: String,
      },

      addressLine2: String,

      city: {
        type: String,
      },

      state: String,

      postalCode: String,

      country: {
        type: String,
        required: true,
        default: "Pakistan",
      },
    },
  },
  {
    timestamps: true,
  }
);

export const Business = model<IBusiness>("Business", businessSchema);