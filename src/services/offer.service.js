import {offerRepository, OfferRepository} from "../repositories/offer.repository.js";

export class OfferService {
    constructor() {
        this.offerRepository = offerRepository;
    }

    listOffers(productId) {
        return this.offerRepository.getAll(productId);
    }

    getOffer(productId, offerId) {
        return this.offerRepository.get(productId, offerId);
    }
    
    exists(productId, offerId) {
        return this.offerRepository.has(productId, offerId);
    }

    createOffer(productId, offer) {
        const newId = this.offerRepository.getNewId(productId);
        const normalizedOffer = this._normalizeOffer(offer, {});
        return this.offerRepository.create(productId, newId, { id: newId, productId, ...normalizedOffer });
    }

    updateOffer(productId, offerId, offer) {
        const existing = this.getOffer(productId, offerId) || {};
        const normalizedOffer = this._normalizeOffer(offer, existing);
        return this.offerRepository.update(productId, offerId, {id: offerId , ...normalizedOffer });
    }

    deleteOffer(productId, offerId) {
        return this.offerRepository.delete(productId, offerId);
    }
    
    createProductMap(productId) {
        this.offerRepository.createProductMap(productId);
    }

    deleteProductMap(productId) {
        this.offerRepository.deleteProductMap(productId);
    }

    _normalizeOffer(input = {}, existing = {}) {
        const merged = {...existing, ...input};
        const normalized = {};

        if (!merged.seller_name || String(merged.seller_name).trim() === '') {
            throw new Error('Offer must have a seller name.');
        }
        normalized.seller_name = String(merged.seller_name);

        normalized.stock = Number.isFinite(Number(merged.stock))
            ? Number(merged.stock)
            : 0;
        normalized.condition = merged.condition ?? 'new';
        normalized.price = Number.isFinite(Number(merged.price))
            ? Number(merged.price)
            : 0;
        normalized.discount_percentage = Number.isFinite(Number(merged.discount_percentage))
            ? Number(merged.discount_percentage)
            : 0;
        normalized.free_shipping = merged.free_shipping ?? false;
        normalized.installments = Number.isFinite(Number(merged.installments))
            ? Number(merged.installments)
            : 0;
        
        return normalized;
    }
}