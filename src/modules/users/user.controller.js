import UserService from "./user.service.js";
import { apiError, apiSuccess } from "../../utlis/apiResponse.js";
import { uploadOnCloudinary } from "../../utlis/cloudinary.utils.js";
import { OrderModel } from "../orders/order.model.js";

const UserController = {
  createUser: async (req, res) => {
    try {
      if (req.body.email) {
        const existingUser = await UserService.isExistUser(req.body.email);

        if (existingUser) {
          const checkImageUpdates =
            req.body.photoURL && existingUser.photoURL !== req.body.photoURL;

          if (checkImageUpdates) {
            existingUser.photoURL = req.body.photoURL;
            const result = await existingUser.save();
            return apiSuccess(res, result, "User updated with new photoURL", 200);
          }

          return apiSuccess(res, existingUser, "User already exists", 200);
        }
      }

      const payload = {
        ...req.body,
        role: "user",
      };

      const result = await UserService.createUser(payload);
      return apiSuccess(res, result, "User created", 201);
    } catch (error) {
      return apiError(res, error, "Failed to create user", 400);
    }
  },

  getSingleUser: async (req, res) => {
    const { gmail } = req.query;
    try {
      const result = await UserService.getUserByEmail(gmail);
      return apiSuccess(res, result);
    } catch (error) {
      return apiError(res, error, "Failed to fetch user");
    }
  },

  updateUser: async (req, res) => {
    try {
      const userId = req.params.id;

      const updateData = {
        name: req.body.name.trim(),
        email: req.body.email,
        phone: req.body.phone.trim(),
        photoURL: req.body.photoURL,
        address: {
          division: req.body.division.trim(),
          city: req.body.city.trim(),
          address: req.body.address.trim(),
        }
      };

      if (req.file) {
        const cloudHostedImage = await uploadOnCloudinary(req.file.path);

        if (!cloudHostedImage) {
          return res.status(500).json({
            success: false,
            message: "Failed to upload image",
          });
        }

        updateData.photoURL = cloudHostedImage.secure_url;
      }

      const updatedUser = await UserService.updateUserById(userId, updateData);
      return apiSuccess(res, updatedUser, "User updated");
    } catch (error) {
      return apiError(res, error, "Failed to update user");
    }
  },

  deleteUser: async (req, res) => {
    try {
      const result = await UserService.deleteUserById(req.params.id);
      return apiSuccess(res, result, "User deleted");
    } catch (error) {
      return apiError(res, error, "Failed to delete user");
    }
  },

  getCustomers: async (req, res) => {
    try {
      const { search, status } = req.query;

      // Get all customers
      const customers = await UserService.getAllCustomers();
      // Get customer counts
      const counts = await UserService.getCustomersCount();

      const customersWithStats = await Promise.all(
        customers.map(async (customer) => {
          // Get order statistics
          const orders = await OrderModel.find({ userId: customer._id }).lean();

          const totalOrders = orders.length;
          const totalSpent = orders.reduce((sum, order) => sum + order.pricing.total, 0);

          // Get last order date
          const lastOrder = orders.length > 0
            ? orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0].createdAt
            : null;

          // Determine status (Active if last order within 30 days)
          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 60);

          const isActive = lastOrder && new Date(lastOrder) >= thirtyDaysAgo;

          return {
            _id: customer._id,
            name: customer.name,
            email: customer.email,
            phone: customer.phone || 'N/A',
            photoURL: customer.photoURL || null,
            city: customer.address?.city || 'N/A',
            division: customer.address?.division || 'N/A',
            createdAt: customer.createdAt,
            orderStats: {
              totalOrders,
              totalSpent,
              lastOrderDate: lastOrder
            },
            status: isActive ? 'active' : 'inactive'
          };
        })
      );

      // Apply search filter
      let filteredCustomers = customersWithStats;

      if (search) {
        const searchLower = search.toLowerCase();
        filteredCustomers = filteredCustomers.filter(c =>
          c.name.toLowerCase().includes(searchLower) ||
          c.email.toLowerCase().includes(searchLower) ||
          c.phone.includes(search)
        );
      }

      // Apply status filter
      if (status && status !== 'all') {
        filteredCustomers = filteredCustomers.filter(c => c.status === status);
      }

      // Count active customers
      const activeCustomers = customersWithStats.filter(c => c.status === 'active').length;

      return apiSuccess(res, {
        customers: filteredCustomers,
        summary: {
          totalCustomers: counts.totalCustomers,
          newThisMonth: counts.newThisMonth,
          activeCustomers
        }
      }, "Customers fetched successfully");

    } catch (error) {
      console.error('Get customers error:', error);
      return apiError(res, error, "Failed to fetch customers");
    }
  },



  // Get all admin users (owner, manager, staff)
  getAdminUsers: async (req, res) => {
    try {
      const adminUsers = await UserService.getAllAdminUsers();
      return apiSuccess(res, adminUsers, "Admin users fetched successfully");
    } catch (error) {
      console.error('Error fetching admin users:', error);
      return apiError(res, error, "Failed to fetch admin users");
    }
  },

  // Add new admin user
  addAdminUser: async (req, res) => {
    try {
      const { email, role } = req.body;

      if (!email || !role) {
        return apiError(res, null, "Email and role are required", 400);
      }

      if (!['admin', 'manager', 'staff'].includes(role)) {
        return apiError(res, null, "Invalid role. Must be owner, manager, or staff", 400);
      }

      // Check if user exists
      const existingUser = await UserService.isExistUser(email);

      if (existingUser) {
        // User exists, update their role to admin
        const updatedUser = await UserService.updateUserById(existingUser._id, { role });

        // Return with consistent format including id field
        const responseData = {
          ...updatedUser.toObject(),
          id: updatedUser._id.toString(),
          status: 'active'
        };

        return apiSuccess(res, responseData, "User promoted to admin successfully", 200);
      } else {
        // Create new admin user
        const newAdmin = await UserService.createUser({
          name: email.split('@')[0], // Default name from email
          email,
          role,
          phone: '',
          photoURL: null,
          address: {
            division: '',
            city: '',
            address: ''
          }
        });

        // Return with consistent format including id field
        const responseData = {
          ...newAdmin.toObject(),
          id: newAdmin._id.toString(),
          status: 'active'
        };

        return apiSuccess(res, responseData, "Admin user created successfully", 201);
      }
    } catch (error) {
      console.error('Error adding admin user:', error);
      return apiError(res, error, "Failed to add admin user");
    }
  },

  // Update admin user role
  updateAdminRole: async (req, res) => {
    try {
      const { id } = req.params;
      const { role } = req.body;

      if (!role || !['admin', 'manager', 'staff'].includes(role)) {
        return apiError(res, null, "Invalid role. Must be owner, manager, or staff", 400);
      }

      const updatedUser = await UserService.updateUserById(id, { role });

      if (!updatedUser) {
        return apiError(res, null, "Admin user not found", 404);
      }

      const responseData = {
        ...updatedUser.toObject(),
        id: updatedUser._id.toString(),
        status: 'active'
      };

      return apiSuccess(res, responseData, "Admin role updated successfully");
    } catch (error) {
      console.error('Error updating admin role:', error);
      return apiError(res, error, "Failed to update admin role");
    }
  },

  // Delete admin user (convert back to regular user)
  deleteAdminUser: async (req, res) => {
    try {
      const { id } = req.params;

      // Convert admin to regular user instead of deleting
      const updatedUser = await UserService.updateUserById(id, { role: 'user' });

      if (!updatedUser) {
        return apiError(res, null, "Admin user not found", 404);
      }

      return apiSuccess(res, updatedUser, "Admin converted to regular user successfully");
    } catch (error) {
      console.error('Error deleting admin user:', error);
      return apiError(res, error, "Failed to delete admin user");
    }
  }
};

export default UserController;
