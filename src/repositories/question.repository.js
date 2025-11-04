import { loadQuestions } from "./data.js";

export class QuestionRepository {
    constructor() {
        this.questions = new Map();
    }

    async init() {
        this.questions = await loadQuestions();
        return this;
    }

    getAll(productId) {
        return Array.from(this.questions.get(productId).values());
    }

    get(productId, id) {
        return this.questions.get(productId).get(id);
    }

    create(productId, id, question) {
        this.questions.get(productId).set(id, question);
        return this.questions.get(productId).get(id);
    }

    update(productId, id, question) {
        const productQuestions = this.questions.get(productId);
        if (!productQuestions.has(id)) return null;
        productQuestions.set(id, question);
        return productQuestions.get(id);
    }

    has(productId, id) {
        return this.questions.get(productId).has(id);
    }

    delete(productId, id) {
        return this.questions.get(productId).delete(id);
    }

    getLastId(productId) {
        if (this.questions.get(productId).size === 0) return null;
        return Array.from(this.questions.get(productId).keys()).sort(
            (a, b) => Number(a.replace("Q", "")) - Number(b.replace("Q", ""))
        ).pop();
    }

    getNewId(productId) {
        const lastId = this.getLastId(productId);
        if (!lastId) return "Q1";
        const newIdNumber = Number(lastId.replace("Q", "")) + 1;
        return `Q${newIdNumber}`;
    }
}

export const questionRepository = new QuestionRepository();
export const questionRepositoryReady = questionRepository.init();
