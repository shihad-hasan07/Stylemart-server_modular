// products.controller.ts
import type { Request, Response } from "express";
import ProductServices from "./products.service.js";
import { apiError, apiSuccess } from "../../utlis/apiResponse.js";

const ProductsController = {
    addProduct: async (req: Request, res: Response) => {
        try {
            const result = await ProductServices.addProduct(req.body);
            return apiSuccess(res, result, "Product created successfully", 201);
        } catch (error: any) {
            return apiError(res, error, "Failed to create product");
        }
    },

    getProducts: async (req: Request, res: Response) => {
        try {
            const result = await ProductServices.getProducts();
            return apiSuccess(res, result);
        } catch (error: any) {
            return apiError(res, error, "Failed to fetch products");
        }
    },

    getSingleProduct: async (req: Request, res: Response) => {
        try {
            const result = await ProductServices.getSingleProduct(req.params.id as string);
            return apiSuccess(res, result);
        } catch (error: any) {
            return apiError(res, error, "Failed to fetch product");
        }
    },

    updateProduct: async (req: Request, res: Response) => {
        try {
            const result = await ProductServices.updateProduct(req.params.id as string, req.body);
            return apiSuccess(res, result, "Product updated");
        } catch (error: any) {
            return apiError(res, error, "Failed to update product");
        }
    },

    deleteProduct: async (req: Request, res: Response) => {
        try {
            const result = await ProductServices.deleteProduct(req.params.id as string);
            return apiSuccess(res, result, "Product deleted");
        } catch (error: any) {
            return apiError(res, error, "Failed to delete product");
        }
    },
};

export default ProductsController;
