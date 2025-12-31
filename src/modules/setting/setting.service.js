import { SettingsModel } from "./setting.model.js";


const SettingsService = {
    // Get or create settings (singleton pattern - only one settings document)
    getOrCreateSettings: async () => {
        let settings = await SettingsModel.findOne();
        
        // If no settings exist, create default settings
        if (!settings) {
            settings = await SettingsModel.create({
                name: '',
                email: '',
                phone: '',
                address: '',
                currency: 'BDT',
                logo: null,
                socialLinks: {
                    facebook: '',
                    instagram: '',
                    youtube: ''
                },
                bkashMerchant: '',
                nagadMerchant: '',
                instructions: ''
            });
        }
        
        return settings;
    },

    // Get store information only
    getStoreInfo: async () => {
        const settings = await SettingsService.getOrCreateSettings();
        
        return {
            name: settings.name,
            email: settings.email,
            phone: settings.phone,
            address: settings.address,
            currency: settings.currency,
            logo: settings.logo,
            socialLinks: settings.socialLinks
        };
    },

    // Update store information
    updateStoreInfo: async (storeData) => {
        let settings = await SettingsService.getOrCreateSettings();
        
        // Update only store-related fields
        if (storeData.name !== undefined) settings.name = storeData.name;
        if (storeData.email !== undefined) settings.email = storeData.email;
        if (storeData.phone !== undefined) settings.phone = storeData.phone;
        if (storeData.address !== undefined) settings.address = storeData.address;
        if (storeData.currency !== undefined) settings.currency = storeData.currency;
        if (storeData.logo !== undefined) settings.logo = storeData.logo;
        if (storeData.socialLinks !== undefined) {
            settings.socialLinks = {
                ...settings.socialLinks,
                ...storeData.socialLinks
            };
        }
        
        await settings.save();
        
        return {
            name: settings.name,
            email: settings.email,
            phone: settings.phone,
            address: settings.address,
            currency: settings.currency,
            logo: settings.logo,
            socialLinks: settings.socialLinks
        };
    },

    // Get payment configuration only
    getPaymentConfig: async () => {
        const settings = await SettingsService.getOrCreateSettings();
        
        return {
            bkashMerchant: settings.bkashMerchant,
            nagadMerchant: settings.nagadMerchant,
            instructions: settings.instructions
        };
    },

    // Update payment configuration
    updatePaymentConfig: async (paymentData) => {
        let settings = await SettingsService.getOrCreateSettings();
        
        // Update only payment-related fields
        if (paymentData.bkashMerchant !== undefined) {
            settings.bkashMerchant = paymentData.bkashMerchant;
        }
        if (paymentData.nagadMerchant !== undefined) {
            settings.nagadMerchant = paymentData.nagadMerchant;
        }
        if (paymentData.instructions !== undefined) {
            settings.instructions = paymentData.instructions;
        }
        
        await settings.save();
        
        return {
            bkashMerchant: settings.bkashMerchant,
            nagadMerchant: settings.nagadMerchant,
            instructions: settings.instructions
        };
    }
};

export default SettingsService;
