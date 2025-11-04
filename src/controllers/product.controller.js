import {ProductService} from "../services/product.service.js";

export class ProductController {

   constructor() {
       this.productService = new ProductService();
   }

    async listProducts (req, res){
        try {
            const {
                title,
                minPrice,
                maxPrice,
                minDiscount,
                freeShipping,
                hasInstallments,
                minRating,
                minReviews
            } = req.query;
            const errors = [];

            const parsedMinPrice = minPrice !== undefined ? Number(minPrice) : undefined;
            const parsedMaxPrice = maxPrice !== undefined ? Number(maxPrice) : undefined;
            const parsedMinDiscount = minDiscount !== undefined ? Number(minDiscount) : undefined;
            const parsedFreeShipping = freeShipping !== undefined ? (freeShipping === 'true' || freeShipping === '1') : undefined;
            const parsedHasInstallments = hasInstallments !== undefined ? (hasInstallments === 'true' || hasInstallments === '1') : undefined;
            const parsedMinRating = minRating !== undefined ? Number(minRating) : undefined;
            const parsedMinReviews = minReviews !== undefined ? Number(minReviews) : undefined;

            if (parsedMinPrice !== undefined && (!Number.isFinite(parsedMinPrice) || parsedMinPrice < 0)) {
                errors.push('minPrice must be a number >= 0');
            }
            if (parsedMaxPrice !== undefined && (!Number.isFinite(parsedMaxPrice) || parsedMaxPrice < 0)) {
                errors.push('maxPrice must be a number >= 0');
            }
            if (parsedMinPrice !== undefined && parsedMaxPrice !== undefined && parsedMinPrice > parsedMaxPrice) {
                errors.push('minPrice cannot be greater than maxPrice');
            }
            if (parsedMinDiscount !== undefined && (!Number.isFinite(parsedMinDiscount) || parsedMinDiscount < 0 || parsedMinDiscount > 100)) {
                errors.push('minDiscount must be a number between 0 and 100');
            }
            if (parsedMinRating !== undefined && (!Number.isFinite(parsedMinRating) || parsedMinRating < 1 || parsedMinRating > 5)) {
                errors.push('minRating must be a number between 1 and 5');
            }
            if (parsedMinReviews !== undefined && (!Number.isFinite(parsedMinReviews) || parsedMinReviews < 0 || !Number.isInteger(parsedMinReviews))) {
                errors.push('minReviews must be an integer >= 0');
            }

            const filters = {};
            if (title !== undefined) filters.title = String(title);
            if (parsedMinPrice !== undefined) filters.minPrice = parsedMinPrice;
            if (parsedMaxPrice !== undefined) filters.maxPrice = parsedMaxPrice;
            if (parsedMinDiscount !== undefined) filters.minDiscount = parsedMinDiscount;
            if (parsedFreeShipping !== undefined) filters.freeShipping = parsedFreeShipping;
            if (parsedHasInstallments !== undefined) filters.hasInstallments = parsedHasInstallments;
            if (parsedMinRating !== undefined) filters.minRating = parsedMinRating;
            if (parsedMinReviews !== undefined) filters.minReviews = parsedMinReviews;

            if (errors.length) {
                return res.status(400).json({ errors });
            }

            const products = await this.productService.listProducts(filters);
            res.status(200).json(products);
        } catch (err) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async getProduct (req, res) {
        try {
            const id = req.params.id;
            const product = await this.productService.getProduct(id);
            res.status(200).json(product);
        } catch (err) {
            res.status(500).json({ error: 'Internal Server Error' });
        }

    }

    async createProduct (req, res) {
        try {
            const product = req.body;
            const newProduct = await this.productService.createProduct(product);
            res.status(201).json(newProduct);
        } catch (err) {
            const errorMessage = err.message || 'Internal Server Error';
            res.status(500).json({ error: errorMessage });
        }
    }

    async updateProduct(req, res) {
        try {
            const id = req.params.id;
            const product = req.body;
            const updatedProduct = await this.productService.updateProduct(id, product);
            res.status(200).json(updatedProduct);
        } catch (err) {
            const errorMessage = err.message || 'Internal Server Error';
            res.status(500).json({ error: errorMessage });
        }

    }

    async deleteProduct (req, res) {
        try {
            const id = req.params.id;
            await this.productService.deleteProduct(id);
            res.status(204).send();
        } catch (err) {
            res.status(500).json({ error: 'Internal Server Error' });
        }

    }
}