import { ReviewService } from "../services/review.service.js";

export class ReviewController {
  constructor() {
    this.reviewService = new ReviewService();
  }

  async listReviews(req, res) {
    try {
      const productId = req.params.id;
      const list = await this.reviewService.listReviews(productId);
      res.status(200).json(list);
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getReview(req, res) {
    try {
      const productId = req.params.id;
      const reviewId = req.params.reviewId;
      const item = await this.reviewService.getReview(productId, reviewId);
      if (!item) return res.status(404).json({ error: `Review with id ${reviewId} does not exist for product ${productId}.` });
      res.status(200).json(item);
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async createReview(req, res) {
    try {
      const productId = req.params.id;
      const body = req.body || {};
      const created = await this.reviewService.createReview(productId, body);
      res.status(201).json(created);
    } catch (err) {
        const errorMessage = err.message || "Internal Server Error";
      res.status(500).json({ error: errorMessage });
    }
  }

  async updateReview(req, res) {
    try {
      const productId = req.params.id;
      const reviewId = req.params.reviewId;
      const body = req.body || {};
      const updated = await this.reviewService.updateReview(productId, reviewId, body);
      if (!updated) return res.status(404).json({ error: `Review with id ${reviewId} does not exist for product ${productId}.` });
      res.status(200).json(updated);
    } catch (err) {
        const errorMessage = err.message || "Internal Server Error";
        res.status(500).json({ error: errorMessage } );
    }
  }

  async deleteReview(req, res) {
    try {
      const productId = req.params.id;
      const reviewId = req.params.reviewId;
      const deleted = await this.reviewService.deleteReview(productId, reviewId);
      if (!deleted) return res.status(404).json({ error: `Review with id ${reviewId} does not exist for product ${productId}.` });
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
