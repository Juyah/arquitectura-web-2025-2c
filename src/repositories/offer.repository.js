import {loadOffers} from "./data.js";

export class OfferRepository {
    constructor() {
        this.offers = new Map();
    }

    async init() {
        this.offers = await loadOffers();
        return this;
    }

    getAll(productId) {
        return Array.from(this.offers.get(productId).values());
    }

    get(productId, id) {
        return this.offers.get(productId).get(id);
    }

    create(productId, id, offer) {
        this.offers.get(productId).set(id, offer);
        return this.offers.get(productId).get(id);
    }

    update(productId, id, offer) {
        const productOffers = this.offers.get(productId);
        if (!productOffers.has(id)) return null;
        productOffers.set(id, offer);
        return productOffers.get(id);
        // if (!this.offers.get(productId).has(id)) return null;
        // this.offers.get(productId).set(id, offer);
        // return this.offers.get(productId).get(id);
    }

    has(productId, id) {
        return this.offers.get(productId).has(id);
    }

    delete(productId, id) {
        return this.offers.get(productId).delete(id);
    }

    getLastId(productId) {
        if(this.offers.get(productId).size === 0) return null;
        return Array.from(this.offers.get(productId).keys()).sort(
            (a, b) => Number(a.replace("SHOP", "")) - Number(b.replace("SHOP", ""))
        ).pop();
    }

    getNewId(productId) {
        const lastId = this.getLastId(productId);
        if (!lastId) return "SHOP1";
        const newIdNumber = Number(lastId.replace("SHOP", "")) + 1;
        return `SHOP${newIdNumber}`;
    }
}

export const offerRepository = new OfferRepository();
export const offerRepositoryReady = offerRepository.init();
