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
    return this.questionRepository.create(productId, newId, { id: newId, ...question });
  }

  updateQuestion(productId, questionId, question) {
    return this.questionRepository.update(productId, questionId, { id: questionId, ...question });
  }

  deleteQuestion(productId, questionId) {
    return this.questionRepository.delete(productId, questionId);
  }
}