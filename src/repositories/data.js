import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs/promises';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataRoot = path.resolve(__dirname, '..', '..', 'resources', 'local-db');


async function readJson(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    return JSON.parse(content);
  } catch (e) {
    if (e && e.code === 'ENOENT') {
      return null;
    }
    throw e;
  }
}

export async function loadCatalog() {
    const catalog = new Map();
    const catalogFile = path.join(dataRoot, 'catalog.json');
    const catalogJson = await readJson(catalogFile);
    if (catalogJson) {
        catalogJson.forEach(product => {
            catalog.set(product.id, product);
        });
    }
    return catalog;
}

export async function loadQuestions(){
    return load('questions');
}

export async function loadOffers(){
    return load('offers');
}

export async function loadReviews(){
    return load('reviews');
}

async function load(filename){
    const genericMap = new Map();
    const genericFile = path.join(dataRoot, `${filename}.json`);
    const genericJson = await readJson(genericFile);
    if (genericJson) {
        genericJson.forEach(object => {
            if (genericMap.has(object.productId)) {
                genericMap.get(object.productId).set(object.id, object);
            } else {
                const productMap = new Map();
                productMap.set(object.id, object);
                genericMap.set(object.productId, productMap);
            }
        });
    }
    return genericMap;
}

// export async function loadQuestions(){
//     const questions = new Map();
//     const questionsFile = path.join(dataRoot, 'questions.json');
//     const questionsJson = await readJson(questionsFile);
//     if (questionsJson) {
//         questionsJson.forEach(question => {
//             if (questions.has(question.productId)) {
//                 questions.get(question.productId).set(question.id, question);
//             } else {
//                 const productQuestions = new Map();
//                 productQuestions.set(question.id, question);
//                 questions.set(question.productId, productQuestions);
//             }
//         });
//     }
//     return questions;
// }
