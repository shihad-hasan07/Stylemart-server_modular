import { ProductsModel } from "./products.model.js";

const ProductServices = {
    addProduct: async (payload) => {
        return ProductsModel.create(payload);
    },

    getProducts: async () => {
        // const skip = (page - 1) * limit;

        const products = await ProductsModel.find()
            // .skip(skip)
            // .limit(limit)
            // .lean()

        // const total = await ProductsModel.countDocuments()

        return {
            products,
            // pagination: {
            //     page,
            //     limit,
            //     totalProducts: total,
            //     totalPages: Math.ceil(total / limit),
            //     hasPrev: page > 1,
            //     hasNext: page * limit < total
            // }
        }
    },

    getSingleProduct: async (id) => {
        return ProductsModel.findById(id);
    },

    getMultipleProducts: async (ids) => {
        return ProductsModel.find({
            _id: { $in: ids }
        })
    },

    deleteProduct: async (productId) => {
        return ProductsModel.findByIdAndDelete(productId);
    },

    updateProduct: async (productId, payload) => {
        return ProductsModel.findByIdAndUpdate(
            productId,
            { $set: payload },
            { new: true }
        );
    },
};

export default ProductServices;
