import type { IReview } from "./reviews.interface.js";
export declare const ReviewServices: {
    addReview: (payload: IReview) => Promise<import("mongoose").Document<unknown, {}, IReview, {}, {}> & IReview & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getReviewsByProductId: (productId: string) => Promise<(import("mongoose").Document<unknown, {}, IReview, {}, {}> & IReview & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    deleteReview: (reviewId: string) => Promise<(import("mongoose").Document<unknown, {}, IReview, {}, {}> & IReview & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    updateReview: (reviewId: string, payload: Partial<IReview>) => Promise<(import("mongoose").Document<unknown, {}, IReview, {}, {}> & IReview & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
};
//# sourceMappingURL=reviews.service.d.ts.map