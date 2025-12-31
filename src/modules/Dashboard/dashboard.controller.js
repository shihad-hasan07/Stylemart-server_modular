import { apiError, apiSuccess } from "../../utlis/apiResponse.js";
import DashboardService from "./dashboard.service.js";

const DashboardController = {
  // Get all dashboard data
  getDashboard: async (req, res) => {
    try {
      const stats = await DashboardService.getStats();
      const pendingOrders = await DashboardService.getPendingOrdersCount();
      const lowStock = await DashboardService.getLowStockCount();

      return apiSuccess(res, {
        stats,
        alerts: {
          pendingOrders,
          lowStock
        }
      }, "Dashboard data fetched successfully");

    } catch (error) {
      console.error('Dashboard error:', error);
      return apiError(res, error, "Failed to fetch dashboard data");
    }
  },

  // Get only stats
  getStats: async (req, res) => {
    try {
      const stats = await DashboardService.getStats();
      return apiSuccess(res, stats, "Stats fetched successfully");
    } catch (error) {
      return apiError(res, error, "Failed to fetch stats");
    }
  }
};

export default DashboardController;