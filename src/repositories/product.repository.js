import {loadCatalog} from "./data.js";

export class ProductRepository {
    constructor() {
        this.products = new Map();
    }

    async init() {
        this.products = await loadCatalog();
        return this;
    }

    getAll() {
        return Array.from(this.products.values());
    }

    get(id) {
        return this.products.get(id);
    }

    create(id, product) {
        this.products.set(id, product);
        return this.products.get(id);
    }

    update(id, product) {
        this.products.set(id, product);
        return this.products.get(id);
    }

    has(id) {
        return this.products.has(id);
    }

    delete(id) {
        return this.products.delete(id);
    }

    getLastId() {
        if (this.products.size === 0) return null;
        return Array.from(this.products.keys()).sort(
            (a, b) => Number(a.replace("MLA", "")) - Number(b.replace("MLA", ""))
        ).pop();
    }

    getNewId() {
        const lastId = this.getLastId();
        return lastId === null ? "MLA1" : `MLA${Number(lastId.replace("MLA", "")) + 1}`;
    }
}

export const productRepository = new ProductRepository();
export const productRepositoryReady = productRepository.init();
