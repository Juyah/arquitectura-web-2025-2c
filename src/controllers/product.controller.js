import {ProductService} from "../services/product.service.js";

export class ProductController {

   constructor() {
       this.productService = new ProductService();
   }

    async listProducts (req, res){
        try {
            const products = await this.productService.listProducts();
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
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async updateProduct(req, res) {
        try {
            const id = req.params.id;
            const product = req.body;
            const updatedProduct = await this.productService.updateProduct(id, product);
            res.status(200).json(updatedProduct);
        } catch (err) {
            res.status(500).json({ error: 'Internal Server Error' });
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