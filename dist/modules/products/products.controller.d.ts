import type { Request, Response } from "express";
declare const ProductsController: {
    addProduct: (req: Request, res: Response) => Promise<any>;
    getProducts: (req: Request, res: Response) => Promise<any>;
    getSingleProduct: (req: Request, res: Response) => Promise<any>;
    updateProduct: (req: Request, res: Response) => Promise<any>;
    deleteProduct: (req: Request, res: Response) => Promise<any>;
};
export default ProductsController;
//# sourceMappingURL=products.controller.d.ts.map