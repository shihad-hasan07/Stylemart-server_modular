import { z } from "zod";
export declare const UserValidation: {
    create: z.ZodObject<{
        name: z.ZodString;
        email: z.ZodEmail;
        phone: z.ZodOptional<z.ZodString>;
        photoURL: z.ZodOptional<z.ZodString>;
        role: z.ZodOptional<z.ZodEnum<{
            admin: "admin";
            user: "user";
        }>>;
        address: z.ZodOptional<z.ZodObject<{
            division: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            address: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>;
    }, z.core.$strip>;
    update: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        phone: z.ZodOptional<z.ZodString>;
        photoURL: z.ZodOptional<z.ZodString>;
        role: z.ZodOptional<z.ZodEnum<{
            admin: "admin";
            user: "user";
        }>>;
        address: z.ZodOptional<z.ZodObject<{
            division: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            address: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>;
    }, z.core.$strip>;
};
//# sourceMappingURL=user.validation.d.ts.map