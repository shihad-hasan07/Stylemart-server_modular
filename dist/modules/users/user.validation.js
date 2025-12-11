// user.validation.ts
import { z } from "zod";
const addressSchema = z.object({
    division: z.string().optional(),
    city: z.string().optional(),
    address: z.string().optional(),
});
export const UserValidation = {
    create: z.object({
        name: z.string(),
        email: z.email(),
        phone: z.string().optional(),
        photoURL: z.string().optional(),
        role: z.enum(["admin", "user"]).optional(),
        address: addressSchema.optional(),
    }),
    update: z.object({
        name: z.string().optional(),
        phone: z.string().optional(),
        photoURL: z.string().optional(),
        role: z.enum(["admin", "user"]).optional(),
        address: addressSchema.optional(),
    }),
};
//# sourceMappingURL=user.validation.js.map