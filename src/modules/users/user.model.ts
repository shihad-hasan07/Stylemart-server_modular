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
            division: String,
            city: String,
            address: String,
        },
    },
    { timestamps: true }
);

export const UserModel = model<IUser>("users", UserSchema);
