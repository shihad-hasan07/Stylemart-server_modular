
import { Router } from "express";
import SettingsController from "./setting.controller.js";
import { handleMulterError } from "../../middlewares/errorHandler.middleware.js";
import upload from "../../middlewares/multer.middleware.js";

const router = Router();

// Store information routes
router.get("/store", SettingsController.getStoreInfo);

router.put("/store", (req, res, next) => {
    upload.single('logo')(req, res, (err) => {
        if (err) return handleMulterError(err, req, res, next);
        SettingsController.updateStoreInfo(req, res);
    });
});

// Payment configuration routes
router.get("/payment", SettingsController.getPaymentConfig);
router.put("/payment", SettingsController.updatePaymentConfig);

export default router;