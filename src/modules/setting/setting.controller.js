
import { apiError, apiSuccess } from "../../utlis/apiResponse.js";
import { uploadOnCloudinary } from "../../utlis/cloudinary.utils.js";
import SettingsService from "./setting.service.js";

const SettingsController = {
    // Get store information
    getStoreInfo: async (req, res) => {
        try {
            const result = await SettingsService.getStoreInfo();
            return apiSuccess(res, result, "Store information fetched successfully");
        } catch (error) {
            console.error('Error fetching store info:', error);
            return apiError(res, error, "Failed to fetch store information");
        }
    },

    // Update store information
    updateStoreInfo: async (req, res) => {
        try {
            const storeData = {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                address: req.body.address,
                currency: req.body.currency || 'BDT',
            };

            // Handle social links
            storeData.socialLinks = {
                facebook: req.body.facebook || '',
                instagram: req.body.instagram || '',
                youtube: req.body.youtube || ''
            };

            // Handle logo upload if file is provided via multer
            if (req.file) {
                const cloudHostedImage = await uploadOnCloudinary(req.file.path);

                if (!cloudHostedImage) {
                    return apiError(res, null, "Failed to upload logo", 500);
                }

                storeData.logo = cloudHostedImage.secure_url;
            }
            // If logo is sent as base64 or URL in body (for frontend file reader)
            else if (req.body.logo) {
                storeData.logo = req.body.logo;
            }

            const result = await SettingsService.updateStoreInfo(storeData);
            return apiSuccess(res, result, "Store information updated successfully");
        } catch (error) {
            console.error('Error updating store info:', error);
            return apiError(res, error, "Failed to update store information");
        }
    },

    // Get payment configuration
    getPaymentConfig: async (req, res) => {
        try {
            const result = await SettingsService.getPaymentConfig();
            return apiSuccess(res, result, "Payment configuration fetched successfully");
        } catch (error) {
            console.error('Error fetching payment config:', error);
            return apiError(res, error, "Failed to fetch payment configuration");
        }
    },

    // Update payment configuration
    updatePaymentConfig: async (req, res) => {
        try {
            const paymentData = {
                bkashMerchant: req.body.bkashMerchant,
                nagadMerchant: req.body.nagadMerchant,
                instructions: req.body.instructions
            };

            const result = await SettingsService.updatePaymentConfig(paymentData);
            return apiSuccess(res, result, "Payment configuration updated successfully");
        } catch (error) {
            console.error('Error updating payment config:', error);
            return apiError(res, error, "Failed to update payment configuration");
        }
    }
};

export default SettingsController;

