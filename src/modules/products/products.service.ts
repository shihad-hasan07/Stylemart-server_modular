// products.service.ts
import type { IProduct } from "./products.interface.js";
import { ProductsModel } from "./products.model.js";

const ProductServices = {
    addProduct: async (payload: IProduct) => {
        return ProductsModel.create(payload);
    },

    getProducts: async () => {
        return ProductsModel.find();
    },

    getSingleProduct: async (id: string) => {
        return ProductsModel.findById(id);
    },

    deleteProduct: async (productId: string) => {
        return ProductsModel.findByIdAndDelete(productId);
    },

    updateProduct: async (productId: string, payload: Partial<IProduct>) => {
        return ProductsModel.findByIdAndUpdate(
            productId,
            { $set: payload },
            { new: true }
        );
    },
};

export default ProductServices;
