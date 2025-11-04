import { loadReviews } from "./data.js";

export class ReviewRepository {
    constructor() {
        this.reviews = new Map();
    }

    async init() {
        this.reviews = await loadReviews();
        return this;
    }

    getAll(productId) {
        return Array.from(this.reviews.get(productId).values());
    }

    get(productId, id) {
        return this.reviews.get(productId).get(id);
    }

    create(productId, id, review) {
        this.reviews.get(productId).set(id, review);
        return this.reviews.get(productId).get(id);
    }

    update(productId, id, review) {
        const productReviews = this.reviews.get(productId);
        if (!productReviews.has(id)) return null;
        productReviews.set(id, review);
        return productReviews.get(id);
    }

    has(productId, id) {
        return this.reviews.get(productId).has(id);
    }

    delete(productId, id) {
        return this.reviews.get(productId).delete(id);
    }

    getLastId(productId) {
        if (this.reviews.get(productId).size === 0) return null;
        return Array.from(this.reviews.get(productId).keys()).sort(
            (a, b) => Number(a.replace("R", "")) - Number(b.replace("R", ""))
        ).pop();
    }

    getNewId(productId) {
        const lastId = this.getLastId(productId);
        if (!lastId) return "R1";
        const newIdNumber = Number(lastId.replace("R", "")) + 1;
        return `R${newIdNumber}`;
    }
}

export const reviewRepository = new ReviewRepository();
export const reviewRepositoryReady = reviewRepository.init();
