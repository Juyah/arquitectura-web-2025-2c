import { Router } from "express";
import { ProductController } from "./controllers/product.controller.js";
import { OfferController } from "./controllers/offer.controller.js";
import { QuestionController } from "./controllers/question.controller.js";
import { ReviewController } from "./controllers/review.controller.js";
import {productExistsParam} from "./middleware/productExists.middleware.js";
import {ProductService} from "./services/product.service.js";

export const router = Router();
const productController = new ProductController();
const offerController = new OfferController();
const questionController = new QuestionController();
const reviewController = new ReviewController();

// Middleware to check if a product exists by ID
router.param("id", productExistsParam(new ProductService()));

// Product routes
router.get("/", productController.listProducts.bind(productController));
router.get("/:id", productController.getProduct.bind(productController));
router.post("/", productController.createProduct.bind(productController));
router.patch("/:id", productController.updateProduct.bind(productController));
router.delete("/:id", productController.deleteProduct.bind(productController));

// Offer routes
router.get("/:id/offers", offerController.listOffers.bind(offerController));
router.get("/:id/offers/:offerId", offerController.getOffer.bind(offerController));
router.post("/:id/offers", offerController.createOffer.bind(offerController));
router.patch("/:id/offers/:offerId", offerController.updateOffer.bind(offerController));
router.delete("/:id/offers/:offerId", offerController.deleteOffer.bind(offerController));

// Question routes
router.get("/:id/questions", questionController.listQuestions.bind(questionController));
router.get("/:id/questions/:questionId", questionController.getQuestion.bind(questionController));
router.post("/:id/questions", questionController.createQuestion.bind(questionController));
router.patch("/:id/questions/:questionId", questionController.updateQuestion.bind(questionController));
router.delete("/:id/questions/:questionId", questionController.deleteQuestion.bind(questionController));

// Review routes
router.get("/:id/reviews", reviewController.listReviews.bind(reviewController));
router.get("/:id/reviews/:reviewId", reviewController.getReview.bind(reviewController));
router.post("/:id/reviews", reviewController.createReview.bind(reviewController));
router.patch("/:id/reviews/:reviewId", reviewController.updateReview.bind(reviewController));
router.delete("/:id/reviews/:reviewId", reviewController.deleteReview.bind(reviewController));