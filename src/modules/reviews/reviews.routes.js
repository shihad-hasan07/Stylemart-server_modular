import { Router } from "express";
import ReviewController from "./reviews.controller.js";
import { verifyFirebaseToken_andUser } from "../../middlewares/verifyFirebaseToken_andUser.js";


const router = Router();

router.post("/", verifyFirebaseToken_andUser, ReviewController.addReview);

router.patch("/:reviewId", verifyFirebaseToken_andUser, ReviewController.updateReview);

router.delete("/:reviewId", verifyFirebaseToken_andUser, ReviewController.deleteReview);

router.get("/:productId", ReviewController.getReviewsByProduct);

export default router;
