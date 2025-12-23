import { ReviewServices } from "./reviews.service.js";
import { apiSuccess, apiError } from "../../utlis/apiResponse.js";

const ReviewController = {
    // create review
    addReview: async (req, res) => {
        try {
            const userId = req.user._id.toString()
            const { productId, rating, comment } = req.body

            const result = await ReviewServices.addReview(productId, rating, comment, userId);
            return apiSuccess(
                res,
                result,
                "Review added successfully"
            );
        } catch (error) {
            if (error.code === 11000) {
                return apiError(
                    res,
                    error,
                    "You already reviewed this product"
                );
            }

            return apiError(
                res,
                error,
                "Failed to add review"
            );
        }
    },

    // update review
    updateReview: async (req, res) => {
        try {
            const { reviewId } = req.params;
            const user = req.user;
            const userId = user._id.toString()
            const { rating, comment } = req.body
            const result = await ReviewServices.updateReview(
                reviewId,
                userId,
                rating,
                comment
            );

            return apiSuccess(res, result, "Review updated");
        } catch (error) {
            return apiError(
                res,
                error,
                "Failed to update review"
            );
        }
    },

    // delete review
    deleteReview: async (req, res) => {
        try {
            const { reviewId } = req.params;

            // get user info from the verifytoken_andUserz
            const user = req.user;
            const userId = user._id.toString()

            const result = await ReviewServices.deleteReview(
                reviewId,
                userId
            );

            return apiSuccess(res, result, "Review deleted");
        } catch (error) {
            return apiError(
                res,
                error,
                "Failed to delete review"
            );
        }
    },

    // get reviews by product
    getReviewsByProduct: async (req, res) => {
        try {
            const { productId } = req.params;

            if (!productId) {
                return apiError(
                    res,
                    null,
                    "productId is required",
                );
            }

            const result =
                await ReviewServices.getReviewsByProduct(productId);

            return apiSuccess(
                res,
                result,
                "Product reviews fetched successfully"
            );
        } catch (error) {
            return apiError(
                res,
                error,
                "Failed to fetch product reviews"
            );
        }
    },
};

export default ReviewController;
