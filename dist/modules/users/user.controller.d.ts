import type { Request, Response } from "express";
declare const UserController: {
    createUser: (req: Request, res: Response) => Promise<any>;
    getSingleUser: (req: Request, res: Response) => Promise<any>;
    updateUser: (req: Request, res: Response) => Promise<any>;
    deleteUser: (req: Request, res: Response) => Promise<any>;
};
export default UserController;
//# sourceMappingURL=user.controller.d.ts.map