import { UserModel } from "./user.model.js";
import type { IUser } from "./user.interface.js";

const UserService = {
  createUser: async (payload: IUser) => {
    return await UserModel.create(payload);
  },

  isExistUser: async (email: string) => {
    return await UserModel.findOne({ email });
  },

  updateUserById: async (id: string, data: Partial<IUser>) => {
    return await UserModel.findByIdAndUpdate(id, data, { new: true });
  },

  deleteUserById: async (id: string) => {
    return await UserModel.findByIdAndDelete(id);
  },
};

export default UserService;
