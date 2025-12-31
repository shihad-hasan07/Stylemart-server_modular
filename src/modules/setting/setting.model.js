import { Schema, model } from "mongoose";

const SettingsSchema = new Schema(
    {
        name: { type: String, default: '' },
        email: { type: String, default: '' },
        phone: { type: String, default: '' },
        address: { type: String, default: '' },
        currency: { type: String, default: 'BDT' },
        logo: { type: String, default: null },
        socialLinks: {
            facebook: { type: String, default: '' },
            instagram: { type: String, default: '' },
            youtube: { type: String, default: '' }
        },

        // Payment Configuration
        bkashMerchant: { type: String, default: '' },
        nagadMerchant: { type: String, default: '' },
        instructions: { type: String, default: '' }
    },
    { timestamps: true }
);

export const SettingsModel = model("settings", SettingsSchema);

