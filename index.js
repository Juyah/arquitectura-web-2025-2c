import express from 'express';
import {router} from "./src/routes.js";
import { productRepositoryReady } from './src/repositories/product.repository.js';
import {offerRepositoryReady} from "./src/repositories/offer.repository.js";
import {questionRepositoryReady} from "./src/repositories/question.repository.js";
import {reviewRepositoryReady} from "./src/repositories/review.repository.js";

const app = express();
const port = 3000;

app.use(express.json());


app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP' });
});

app.use('/products', router);

async function main() {
    try {
        await productRepositoryReady;
        await offerRepositoryReady;
        await questionRepositoryReady;
        await reviewRepositoryReady;

        app.listen(port, () => {
            console.log(`App listening on port ${port}`);
        });
    } catch (err) {
        console.error('Failed to initialize application:', err);
        process.exit(1);
    }
}

main();
