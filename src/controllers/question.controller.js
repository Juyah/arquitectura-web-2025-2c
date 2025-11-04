import { QuestionService } from "../services/question.service.js";

export class QuestionController {
  constructor() {
    this.questionService = new QuestionService();
  }

  async listQuestions(req, res) {
    try {
      const productId = req.params.id;
      const list = await this.questionService.listQuestions(productId);
      res.status(200).json(list);
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getQuestion(req, res) {
    try {
      const productId = req.params.id;
      const questionId = req.params.questionId;
      const item = await this.questionService.getQuestion(productId, questionId);
      if (!item) return res.status(404).json({ error: `Question with id ${questionId} does not exist for product ${productId}.` });
      res.status(200).json(item);
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async createQuestion(req, res) {
    try {
      const productId = req.params.id;
      const body = req.body || {};
      const created = await this.questionService.createQuestion(productId, body);
      res.status(201).json(created);
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async updateQuestion(req, res) {
    try {
      const productId = req.params.id;
      const questionId = req.params.questionId;
      const body = req.body || {};
      const updated = await this.questionService.updateQuestion(productId, questionId, body);
      if (!updated) return res.status(404).json({ error: `Question with id ${questionId} does not exist for product ${productId}.` });
      res.status(200).json(updated);
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async deleteQuestion(req, res) {
    try {
      const productId = req.params.id;
      const questionId = req.params.questionId;
      const deleted = await this.questionService.deleteQuestion(productId, questionId);
      if (!deleted) return res.status(404).json({ error: `Question with id ${questionId} does not exist for product ${productId}.` });
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
