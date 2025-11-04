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
    const normalizedReview = this._normalizeReview(review, {});
    return this.reviewRepository.create(productId, newId, { id: newId, productId, ...normalizedReview });
  }

  updateReview(productId, reviewId, review) {
    const existing = this.getReview(productId, reviewId) || {};
    const normalizedReview = this._normalizeReview(review, existing);
    return this.reviewRepository.update(productId, reviewId, { id: reviewId, productId, ...normalizedReview });
  }

  deleteReview(productId, reviewId) {
    return this.reviewRepository.delete(productId, reviewId);
  }

  createProductMap(productId) {
    this.reviewRepository.createProductMap(productId);
  }

    deleteProductMap(productId) {
    this.reviewRepository.deleteProductMap(productId);
    }

    _normalizeReview(input = {}, existing = {}) {
        const merged = {...existing, ...input};
        const normalized = {};

        if (!merged.username || String(merged.username).trim() === '') {
            throw new Error('Review must have a user name.');
        }
        normalized.username = String(merged.username);

        if (merged.rating === undefined || !Number.isFinite(Number(merged.rating)) || Number(merged.rating) < 1 || Number(merged.rating) > 5) {
            throw new Error('Review must have a rating between 1 and 5.');
        }
        normalized.rating = Number(merged.rating);

        if (!merged.comment || String(merged.comment).trim() === '') {
            throw new Error('Review must have a comment.');
        }
        normalized.comment = String(merged.comment);

        normalized.date = merged.date ? String(merged.date) : new Date().toISOString().split('T')[0];

        return normalized;
    }
}