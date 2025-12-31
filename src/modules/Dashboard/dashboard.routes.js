import { Router } from "express";
import DashboardController from "./dashboard.controller.js";


const router = Router();

// Get all dashboard data
router.get("/", DashboardController.getDashboard);

// Get only stats
router.get("/stats", DashboardController.getStats);

export default router;