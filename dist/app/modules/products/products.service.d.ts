import type { IProduct } from "./products.interface.js";
declare const ProductServices: {
    addProduct: (payload: IProduct) => Promise<import("mongoose").Document<unknown, {}, IProduct, {}, {}> & IProduct & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getProducts: () => Promise<(import("mongoose").Document<unknown, {}, IProduct, {}, {}> & IProduct & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    deleteProduct: (productId: string) => Promise<(import("mongoose").Document<unknown, {}, IProduct, {}, {}> & IProduct & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    updateProduct: (productId: string, payload: Partial<IProduct>) => Promise<(import("mongoose").Document<unknown, {}, IProduct, {}, {}> & IProduct & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
};
export default ProductServices;
//# sourceMappingURL=products.service.d.ts.map