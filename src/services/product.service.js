import {productRepository} from "../repositories/product.repository.js";
import {OfferService} from "./offer.service.js";
import {QuestionService} from "./question.service.js";
import {ReviewService} from "./review.service.js";

export class ProductService {

    constructor() {
        this.productRepository = productRepository;
        this.offerService = new OfferService();
        this.questionService = new QuestionService();
        this.reviewService = new ReviewService();
    }

    listProducts(filters) {
        const products = this.productRepository.getAll();

        if (!filters || Object.keys(filters).length === 0) return products;

        return products.filter(p => {
            if (filters.title !== undefined) {
                const titleValue = String(p.title ?? '').toLowerCase();
                if (!titleValue.includes(String(filters.title).toLowerCase())) return false;
            }

            const price = Number(p.main_offer?.price);
            if (filters.minPrice !== undefined) {
                if (!Number.isFinite(price) || price < filters.minPrice) return false;
            }
            if (filters.maxPrice !== undefined) {
                if (!Number.isFinite(price) || price > filters.maxPrice) return false;
            }

            if (filters.minDiscount !== undefined) {
                const discount = Number(p.main_offer?.discount_percentage);
                if (!Number.isFinite(discount) || discount < filters.minDiscount) return false;
            }

            if (filters.freeShipping !== undefined) {
                const free = Boolean(p.main_offer?.free_shipping);
                if (free !== filters.freeShipping) return false;
            }

            if (filters.hasInstallments !== undefined) {
                let hasInst= Number(p.main_offer?.installments) > 0;
                if (hasInst !== filters.hasInstallments) return false;
            }

            if (filters.minRating !== undefined) {
                const rating = Number(                    p.review_summary?.average_rating                 );
                if (!Number.isFinite(rating) || rating < filters.minRating) return false;
            }

            if (filters.minReviews !== undefined) {
                let reviewsCount = p.review_summary?.total_reviews;
                if (!Number.isFinite(reviewsCount) || reviewsCount < filters.minReviews) return false;
            }

            return true;
        });
    }

    getProduct(id) {
        return this.productRepository.get(id);
    }

    exists(id) {
        return this.productRepository.has(id);
    }

    createProduct(product) {
        const newId = this.productRepository.getNewId();
        this.offerService.createProductMap(newId);
        this.questionService.createProductMap(newId);
        this.reviewService.createProductMap(newId);
        const main_offer = this.offerService.createOffer(newId, product.main_offer);
        const normalizedProduct = this._normalizeProduct({...product, main_offer}, {});
        return this.productRepository.create(newId, {id: newId, ...normalizedProduct});
    }

    updateProduct(id, product) {
        const existing = this.getProduct(id) || {};
        const normalizedProduct = this._normalizeProduct(product, existing);
        return this.productRepository.update(id, {id, ...normalizedProduct});
    }

    deleteProduct(id) {
        this.offerService.deleteProductMap(id);
        this.questionService.deleteProductMap(id);
        this.reviewService.deleteProductMap(id);
        return this.productRepository.delete(id);
    }

    _normalizeProduct(input = {}, existing = {}) {
        const merged = {...existing, ...input};
        const normalized = {};

        if (!merged.title || String(merged.title).trim() === '') {
            throw new Error('Product must have a title.');
        }
        normalized.title = String(merged.title);
        normalized.pictures = Array.isArray(merged.pictures) ? merged.pictures : [];
        normalized.description = merged.description ?? '';

        if (Array.isArray(merged.attributes)) {
            normalized.attributes = merged.attributes
                .map(a => ({ name: a?.name ?? '', value: a?.value ?? '' }))
                .filter(a => (a.name !== null && a.name !== undefined && String(a.name).trim() !== ''));
        } else {
            normalized.attributes = [];
        }

        normalized.review_summary = {};
        normalized.review_summary.total_reviews = Number.isFinite(Number(merged.review_summary?.total_reviews))
            ? Number(merged.review_summary.total_reviews)
            : 0;
        normalized.review_summary.average_rating = Number.isFinite(Number(merged.review_summary?.average_rating))
            ? Number(merged.review_summary.average_rating)
            : -1;

        normalized.main_offer = merged.main_offer;

        return normalized;
    }
}