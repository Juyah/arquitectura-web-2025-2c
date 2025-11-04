import { reviewRepository } from "../repositories/review.repository.js";

export class ReviewService {
  constructor() {
    this.reviewRepository = reviewRepository;
  }

  listReviews(productId) {
    return this.reviewRepository.getAll(productId);
  }

  getReview(productId, reviewId) {
    return this.reviewRepository.get(productId, reviewId);
  }

  exists(productId, reviewId) {
    return this.reviewRepository.has(productId, reviewId);
  }

  createReview(productId, review) {
    const newId = this.reviewRepository.getNewId(productId);
    return this.reviewRepository.create(productId, newId, { id: newId, ...review });
  }

  updateReview(productId, reviewId, review) {
    return this.reviewRepository.update(productId, reviewId, { id: reviewId, ...review });
  }

  deleteReview(productId, reviewId) {
    return this.reviewRepository.delete(productId, reviewId);
  }
}