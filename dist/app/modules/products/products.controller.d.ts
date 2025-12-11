import type { Request, Response } from "express";
declare const ProductsController: {
    addProduct: (req: Request, res: Response) => Promise<void>;
    getProducts: (req: Request, res: Response) => Promise<void>;
    deleteProduct: (req: Request, res: Response) => Promise<void>;
    updateProduct: (req: Request, res: Response) => Promise<void>;
};
export default ProductsController;
//# sourceMappingURL=products.controller.d.ts.map