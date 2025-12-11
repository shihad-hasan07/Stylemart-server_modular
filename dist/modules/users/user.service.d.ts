import type { IUser } from "./user.interface.js";
declare const UserService: {
    createUser: (payload: IUser) => Promise<import("mongoose").Document<unknown, {}, IUser, {}, {}> & IUser & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getUserByEmail: (email: string) => Promise<(import("mongoose").Document<unknown, {}, IUser, {}, {}> & IUser & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    getAllUsers: () => Promise<(import("mongoose").Document<unknown, {}, IUser, {}, {}> & IUser & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    isExistUser: (email: string) => Promise<(import("mongoose").Document<unknown, {}, IUser, {}, {}> & IUser & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    updateUserById: (id: string, data: any) => Promise<(import("mongoose").Document<unknown, {}, IUser, {}, {}> & IUser & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    deleteUserById: (id: string) => Promise<(import("mongoose").Document<unknown, {}, IUser, {}, {}> & IUser & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
};
export default UserService;
//# sourceMappingURL=user.service.d.ts.map