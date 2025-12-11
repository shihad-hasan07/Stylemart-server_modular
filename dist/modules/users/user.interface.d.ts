export interface IUser {
    name: string;
    email: string;
    phone?: string;
    photoURL?: string;
    role?: "admin" | "user";
    address?: {
        division?: string;
        city?: string;
        address?: string;
    };
}
//# sourceMappingURL=user.interface.d.ts.map