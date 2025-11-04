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
        return this.offerRepository.create(productId, newId, { id: newId, ...offer });
    }

    updateOffer(productId, offerId, offer) {
        return this.offerRepository.update(productId, offerId, { id: offerId, ...offer });
    }

    deleteOffer(productId, offerId) {
        return this.offerRepository.delete(productId, offerId);
    }
}