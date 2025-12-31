import { UserModel } from "./user.model.js";

const UserService = {
  createUser: async (payload) => {
    return await UserModel.create(payload);
  },

  getUserByEmail: async (email) => {
    return await UserModel.findOne({ email });
  },

  getAllUsers: async () => {
    return await UserModel.find();
  },

  isExistUser: async (email) => {
    return await UserModel.findOne({ email });
  },

  updateUserById: async (id, data) => {
    return await UserModel.findByIdAndUpdate(id, data, { new: true });
  },

  deleteUserById: async (id) => {
    return await UserModel.findByIdAndDelete(id);
  },

  getAllCustomers: async () => {
    return await UserModel.find({ role: 'user' })
      .select('name email phone photoURL address createdAt')
      .sort({ createdAt: -1 })
      .lean();
  },

  getCustomersCount: async () => {
    const totalCustomers = await UserModel.countDocuments({ role: 'user' });

    // New customers this month
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const newThisMonth = await UserModel.countDocuments({
      role: 'user',
      createdAt: { $gte: startOfMonth }
    });

    return { totalCustomers, newThisMonth };
  },


  // Get all admin users (owner, manager, staff)
  getAllAdminUsers: async () => {
    return await UserModel.find({
      role: { $in: ['admin', 'manager', 'staff'] }
    })
      .select('name email role phone photoURL createdAt')
      .sort({ createdAt: -1 })
      .lean()
      .then(users => {
        // Add id and status field for frontend compatibility
        return users.map(user => ({
          ...user,
          id: user._id.toString(),
          status: 'active' // You can add more logic here for inactive users
        }));
      });
  },

  // Check if user has admin role
  isAdmin: async (userId) => {
    const user = await UserModel.findById(userId);
    return user && ['owner', 'manager', 'staff'].includes(user.role);
  },

  // Get admin users count
  getAdminUsersCount: async () => {
    return await UserModel.countDocuments({
      role: { $in: ['owner', 'manager', 'staff'] }
    });
  },

  // Get users by role
  getUsersByRole: async (role) => {
    return await UserModel.find({ role })
      .select('name email phone photoURL createdAt')
      .sort({ createdAt: -1 })
      .lean();
  }

};

export default UserService;
