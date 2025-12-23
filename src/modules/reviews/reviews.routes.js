import { Router } from "express";
import ReviewController from "./reviews.controller.js";
import { verifyFirebaseToken_andUser } from "../../middlewares/verifyFirebaseToken_andUser.js";


const router = Router();

/**
 * Create review
 * POST /api/reviews
 */
router.post("/", verifyFirebaseToken_andUser, ReviewController.addReview);

/**
 * Update review
 * PATCH /api/reviews/:reviewId
 */
router.patch("/:reviewId", verifyFirebaseToken_andUser, ReviewController.updateReview);
// router.patch("/:reviewId",  ReviewController.updateReview);

/**
 * Delete review
 * DELETE /api/reviews/:reviewId
 */
router.delete("/:reviewId", verifyFirebaseToken_andUser, ReviewController.deleteReview);

/**
 * Get reviews by product
 * GET /api/reviews/:productId
 */
router.get("/:productId", ReviewController.getReviewsByProduct);

export default router;
