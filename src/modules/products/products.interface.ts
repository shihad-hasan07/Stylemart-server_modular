
export interface IProduct {
    name: string;
    slug: string;
    brand: string;
    description: string;
    price: number;

    sale?: {
        active: boolean;
        price?: number;
        ends?: string;
    };
    rating?: {
        average: number;
        count: number;
    };

    images: string[];
    categories: string[];
    tags: string[];

    stock: {
        inStock: boolean;
        quantity: number;
    };

    variations: {
        attribute: string;
        options: string[];
    }[];

    cartCount: number;
    wishlistCount: number;
}
