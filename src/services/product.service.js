import {productRepository} from "../repositories/product.repository.js";

export class ProductService {

    constructor() {
        this.productRepository = productRepository;
    }

    listProducts() {
        return this.productRepository.getAll();
    }

    getProduct(id) {
        return this.productRepository.get(id);
    }

    exists(id) {
        return this.productRepository.has(id);
    }

    //TODO: Add maps for the other services
    createProduct(product) {
        const newId = this.productRepository.getNewId();
        return this.productRepository.create(newId, {id: newId, ...product});
    }

    updateProduct(id, product) {
        if (!this.exists(id)) {
            throw new Error(`Product with id ${id} does not exist.`);
        }
        return this.productRepository.update(id, {id, ...product});
    }

    //TODO: Remove maps from the other services
    deleteProduct(id) {
        return this.productRepository.delete(id);
    }
}