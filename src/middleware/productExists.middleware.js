export function productExistsParam(productService) {
    return async (req, res, next, id) => {
        try {
            const product = await productService.exists(id);
            if (!product) return res.status(404).json({ error: `Product not found with id: ${id}` });
            req.product = product;
            next();
        } catch (err) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };
}