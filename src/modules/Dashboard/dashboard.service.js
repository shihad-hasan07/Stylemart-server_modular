import { OrderModel } from "../orders/order.model.js";
import { ProductsModel } from "../products/products.model.js";
import { UserModel } from "../users/user.model.js";


const DashboardService = {
    // Get dashboard statistics
    getStats: async () => {
        const now = new Date();
        const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

        // Current month data
        const currentMonthOrders = await OrderModel.find({
            createdAt: { $gte: startOfCurrentMonth }
        }).lean();

        // Last month data
        const lastMonthOrders = await OrderModel.find({
            createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth }
        }).lean();

        // Calculate revenue
        const currentRevenue = currentMonthOrders.reduce((sum, order) => sum + order.pricing.total, 0);
        const lastRevenue = lastMonthOrders.reduce((sum, order) => sum + order.pricing.total, 0);
        const revenueChange = lastRevenue > 0
            ? (((currentRevenue - lastRevenue) / lastRevenue) * 100).toFixed(1)
            : 0;

        // Calculate orders
        const currentOrdersCount = currentMonthOrders.length;
        const lastOrdersCount = lastMonthOrders.length;
        const ordersChange = lastOrdersCount > 0
            ? (((currentOrdersCount - lastOrdersCount) / lastOrdersCount) * 100).toFixed(1)
            : 0;

        // Total products
        const totalProducts = await ProductsModel.countDocuments();
        const lastMonthProducts = await ProductsModel.countDocuments({
            createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth }
        });
        const currentMonthProducts = await ProductsModel.countDocuments({
            createdAt: { $gte: startOfCurrentMonth }
        });
        const productsChange = lastMonthProducts > 0
            ? (((currentMonthProducts - lastMonthProducts) / lastMonthProducts) * 100).toFixed(1)
            : 0;

        // Total customers
        const totalCustomers = await UserModel.countDocuments({ role: 'user' });
        const currentMonthCustomers = await UserModel.countDocuments({
            role: 'user',
            createdAt: { $gte: startOfCurrentMonth }
        });
        const lastMonthCustomers = await UserModel.countDocuments({
            role: 'user',
            createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth }
        });
        const customersChange = lastMonthCustomers > 0
            ? (((currentMonthCustomers - lastMonthCustomers) / lastMonthCustomers) * 100).toFixed(1)
            : 0;

        // Total all-time revenue
        const allOrders = await OrderModel.find().lean();
        const totalRevenue = allOrders.reduce((sum, order) => sum + order.pricing.total, 0);

        return {
            totalRevenue,
            revenueChange: `${revenueChange >= 0 ? '+' : ''}${revenueChange}%`,

            totalOrders: allOrders.length,
            ordersChange: `${ordersChange >= 0 ? '+' : ''}${ordersChange}%`,

            totalProducts,
            productsChange: `${productsChange >= 0 ? '+' : ''}${productsChange}%`,

            totalCustomers,
            customersChange: `${customersChange >= 0 ? '+' : ''}${customersChange}%`
        };
    },

    // Get pending orders count
    getPendingOrdersCount: async () => {
        return await OrderModel.countDocuments({ orderStatus: 'pending' });
    },

    // Get low stock products count
    getLowStockCount: async () => {
        return await ProductsModel.countDocuments({ 'stock.quantity': { $lt: 10 } });
    }
};

export default DashboardService;