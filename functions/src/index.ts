import * as functions from 'firebase-functions';
import firebase from 'firebase-admin';
import express from 'express';
import bodyParser from 'body-parser';
import Products from './models/products.js';
import Users from './models/users.js';

firebase.initializeApp();
const app = express();
const main = express();

// Middleware
app.use(bodyParser.json());
main.use('/api/v1', app);

// Product Routes
// Get aggregate products
app.get('/products', async (_request, response) => {
    try {
        const products = await Products.read();
        response.json(products);
    } catch (error) {
        response.status(400).send((error as Error).message);
    }
});

// Get one product
app.get('/products/:id', async (request, response) => {
    try {
        const product = await Products.read(request.params.id);
        response.json(product);
    } catch (error) {
        response.status(400).send((error as Error).message);
    }
});

// Create product
app.post('/products', (_request, response) => {
    response.send('');
});

// Update product
app.put('/products/:id', (_request, response) => {
    response.send('');
});

// Delete product
app.delete('/products/:id', (_request, response) => {
    response.send('');
});

// User Routes
// Get one user
app.get('/users/:id', (_request, response) => {
    response.send('');
});

// Update user
app.put('/users/:id', async (request, response) => {
    const { displayName } = request.body;
    try {
        await Users.update({ uid: request.params.id, displayName });
        response.status(200).send('Successfully updated user');
    } catch (error) {
        response.status(400).send((error as Error).message);
    }
});

const api = functions.https.onRequest(main);
export default api;
