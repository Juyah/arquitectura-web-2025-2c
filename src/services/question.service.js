import { questionRepository } from "../repositories/question.repository.js";

export class QuestionService {
  constructor() {
    this.questionRepository = questionRepository;
  }

  listQuestions(productId) {
    return this.questionRepository.getAll(productId);
  }

  getQuestion(productId, questionId) {
    return this.questionRepository.get(productId, questionId);
  }

  exists(productId, questionId) {
    return this.questionRepository.has(productId, questionId);
  }

  createQuestion(productId, question) {
    const newId = this.questionRepository.getNewId(productId);
    const normalizedQuestion = this._normalizeQuestion(question, {});
    return this.questionRepository.create(productId, newId, { id: newId, productId, ...normalizedQuestion });
  }

  updateQuestion(productId, questionId, question) {
    const existing = this.getQuestion(productId, questionId) || {};
    const normalizedQuestion = this._normalizeQuestion(question, existing);
    return this.questionRepository.update(productId, questionId, { id: questionId, productId, ...normalizedQuestion });
  }

  deleteQuestion(productId, questionId) {
    return this.questionRepository.delete(productId, questionId);
  }

    createProductMap(productId) {
    this.questionRepository.createProductMap(productId);
    }

    deleteProductMap(productId) {
    this.questionRepository.deleteProductMap(productId);
    }

    _normalizeQuestion(input = {}, existing = {}) {
        const merged = {...existing, ...input};
        const normalized = {};

        if (!merged.username || String(merged.username).trim() === '') {
            throw new Error('Question must have a user name.');
        }
        normalized.username = String(merged.username);
        if (!merged.question || String(merged.question).trim() === '') {
            throw new Error('Question must have a question text.');
        }
        normalized.question = String(merged.question);
        normalized.date = merged.date ? String(merged.date) : new Date().toISOString().split('T')[0];

        if (merged.answer) {
            normalized.answer = {
                text: merged.answer.text ? String(merged.answer.text) : '',
                date: merged.answer.date ? String(merged.answer.date) : new Date().toISOString().split('T')[0]
            };
        } else {
            normalized.answer = null;
        }
        return normalized;
    }
}