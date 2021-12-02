import * as functions from 'firebase-functions';
import firebase from 'firebase-admin';
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import Stripe from 'stripe';
import Products from './models/products.js';
import Users from './models/users.js';
import Auth from './auth.js';
import { Product, ProductPreview, AggregateProducts } from './types';

dotenv.config();
firebase.initializeApp();
const app = express();
const main = express();
const stripe = new Stripe(process.env.STRIPE_TEST_KEY || functions.config().stripe.testkey, {
    apiVersion: '2020-08-27',
});

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
app.post('/products', async (request, response) => {
    const {
        title, goal, creatorName, creatorUID, currentFunds, description,
    } = request.body;
    try {
        await Auth.verifyUser(request.get('Authorization'), creatorUID);
        const productUID = await Products.create({
            title, goal, creatorName, creatorUID, currentFunds, description,
        });
        response.json(productUID);
    } catch (error) {
        response.status(400).send((error as Error).message);
    }
});

// Update aggregate products
app.patch('/products', async (request, response) => {
    const AGGREGATE_PRODUCTS_LIMIT = 10;

    const {
        remove, productUID, title, goal, creatorName, creatorUID,
    } = request.body;
    try {
        // Get previous aggregate data
        let { products } = await Products.read() as AggregateProducts;

        if (remove === true) {
            // Filter product out of array
            products = products.filter((product) => product.productUID !== productUID);
        } else {
            // Insert new product
            products.unshift({
                productUID, title, goal, creatorName, creatorUID,
            } as ProductPreview);
            // If the amount of products has gone over the limit, remove last product
            if (products.length > AGGREGATE_PRODUCTS_LIMIT) {
                products.pop();
            }
        }
        // Update aggregate products
        await Products.update({ products });
        response.status(200).send('Successfully updated aggregate products');
    } catch (error) {
        response.status(400).send((error as Error).message);
    }
});

// Update product
app.put('/products/:id', async (request, response) => {
    const {
        title, goal, creatorName, creatorUID, currentFunds, description,
    } = request.body;
    try {
        // Ensure the requesting user is the creator
        await Auth.verifyUser(request.get('Authorization'), creatorUID);
        // Update the product
        await Products.update({
            title, goal, creatorName, creatorUID, currentFunds, description,
        } as Product, request.params.id);
        response.status(200).send('Successfully updated product');
    } catch (error) {
        response.status(400).send((error as Error).message);
    }
});

// Delete product
app.delete('/products/:id', async (request, response) => {
    try {
        // Get the product creator's UID
        const { creatorUID } = await Products.read(request.params.id) as Product;
        // Ensure the requesting user is the creator
        await Auth.verifyUser(request.get('Authorization'), creatorUID);
        // Delete product
        await Products.delete(request.params.id);
        response.status(200).send('Successfully deleted product');
    } catch (error) {
        response.status(400).send((error as Error).message);
    }
});

// User Routes
// Get one user
app.get('/users/:id', async (request, response) => {
    try {
        const user = await Users.read(request.params.id);
        response.json(user);
    } catch (error) {
        response.status(400).send((error as Error).message);
    }
});

// Update user
app.put('/users/:id', async (request, response) => {
    const { displayName, pledges, products } = request.body;
    try {
        await Auth.verifyUser(request.get('Authorization'), request.params.id);
        await Users.update({
            uid: request.params.id, displayName, pledges, products,
        });
        response.status(200).send('Successfully updated user');
    } catch (error) {
        response.status(400).send((error as Error).message);
    }
});

// Stripe checkout session
app.post('/create-checkout-session/:id', async (request, response) => {
    const { pledgeAmount, pledgerUID } = request.body;

    // Remove commas and get the price in cents
    const priceInCents = parseFloat(pledgeAmount.replace(/,/g, '')) * 100;

    try {
        await Auth.verifyUser(request.get('Authorization'), pledgerUID);
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product: request.params.id,
                        unit_amount: priceInCents,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${request.get('Host')}/products/${request.params.id}/success`,
            cancel_url: `${request.get('Host')}/products/${request.params.id}`,
        });

        if (session.url) {
            response.redirect(303, session.url);
        } else {
            response.status(500).send('There was an error with your request');
        }
    } catch (error) {
        response.status(400).send((error as Error).message);
    }
});

const api = functions.https.onRequest(main);
export default api;
