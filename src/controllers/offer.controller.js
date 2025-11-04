import { OfferService } from "../services/offer.service.js";

export class OfferController {
    constructor() {
        this.offerService = new OfferService();
    }

    async listOffers(req, res) {
        try {
            const productId = req.params.id;
            const list = await this.offerService.listOffers(productId);
            res.status(200).json(list);
        } catch (err) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async getOffer(req, res) {
        try {
            const productId = req.params.id;
            const offerId = req.params.offerId;
            const offer = await this.offerService.getOffer(productId, offerId);
            if (!offer) return res.status(404).json({ error: `Offer with id ${offerId} does not exist for product ${productId}.` });
            res.status(200).json(offer);
        } catch (err) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async createOffer(req, res) {
        try {
            const productId = req.params.id;
            const offer = req.body || {};
            const created = await this.offerService.createOffer(productId, offer);
            res.status(201).json(created);
        } catch (err) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async updateOffer(req, res) {
        try {
            const productId = req.params.id;
            const offerId = req.params.offerId;
            const offer = req.body || {};
            const updated = await this.offerService.updateOffer(productId, offerId, offer);
            if (!updated) return res.status(404).json({ error: `Offer with id ${offerId} does not exist for product ${productId}.` });
            res.status(200).json(updated);
        } catch (err) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async deleteOffer(req, res) {
        try {
            const productId = req.params.id;
            const offerId = req.params.offerId;
            const deleted = await this.offerService.deleteOffer(productId, offerId);
            if (!deleted) return res.status(404).json({ error: `Offer with id ${offerId} does not exist for product ${productId}.` });
            res.status(204).send();
        } catch (err) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}