import { Schema, model } from "mongoose";
import type { IUser } from "./user.interface.js";

const UserSchema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },

        phone: String,
        photoURL: String,

        role: {
            type: String,
            enum: ["admin", "user"],
            default: "user",
        },

        address: {
            division: { type: String, default: '' },
            city: { type: String, default: '' },
            address: { type: String, default: '' },
        },
    },
    { timestamps: true }
);

export const UserModel = model<IUser>("users", UserSchema);
