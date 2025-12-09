import type { Request, Response } from "express";
import UserService from "./user.service.js";
import { apiError, apiSuccess } from "../../utlis/apiResponse.js";

const UserController = {
  createUser: async (req: Request, res: Response) => {
    try {
      if (req.body.email) {
        const existingUser = await UserService.isExistUser(req.body.email);
        if (existingUser) {
          return apiSuccess(res, existingUser, "User already exists", 200);
        }
      }
      const result = await UserService.createUser(req.body);
      return apiSuccess(res, result, "User created", 201);
    } catch (error: any) {
      return apiError(res, error, "Failed to create user", 400);
    }
  },

  updateUser: async (req: Request, res: Response) => {
    try {
      const result = await UserService.updateUserById(req.params.id as string, req.body);
      return apiSuccess(res, result, "User updated");
    } catch (error: any) {
      return apiError(res, error, "Failed to update user");
    }
  },

  deleteUser: async (req: Request, res: Response) => {
    try {
      const result = await UserService.deleteUserById(req.params.id as string);
      return apiSuccess(res, result, "User deleted");
    } catch (error: any) {
      return apiError(res, error, "Failed to delete user");
    }
  },
};

export default UserController;
