import * as functions from 'firebase-functions';
import firebase from 'firebase-admin';
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import Stripe from 'stripe';
import cookieParser from 'cookie-parser';
import Products from './models/products.js';
import Users from './models/users.js';
import Auth from './auth.js';
import Utils from './utils.js';
dotenv.config();
firebase.initializeApp();
const app = express();
const main = express();
const stripe = new Stripe(process.env.STRIPE_TEST_KEY || functions.config().stripe.testkey, {
    apiVersion: '2020-08-27',
});
// Middleware
app.use(cookieParser());
app.use(bodyParser.json());
main.use('/api/v1', app);
let SITE_URL = 'https://rn-db-823f5.web.app';
if (typeof functions.config !== 'function') {
    SITE_URL = process.env.SITE_URL;
}
// Product Routes
// Get aggregate products
app.get('/products', async (_request, response) => {
    try {
        const products = await Products.read();
        response.json(products);
    }
    catch (error) {
        response.status(400).send(error.message);
    }
});
// Get one product
app.get('/products/:id', async (request, response) => {
    try {
        const product = await Products.read(request.params.id);
        response.json(product);
    }
    catch (error) {
        response.status(400).send(error.message);
    }
});
// Create product
app.post('/products', async (request, response) => {
    const { title, goal, creatorName, creatorUID, currentFunds, description, } = request.body;
    try {
        await Auth.verifyUser(request.get('Authorization'), creatorUID);
        const productUID = await Products.create({
            title, goal, creatorName, creatorUID, currentFunds, description,
        });
        response.json(productUID);
    }
    catch (error) {
        response.status(400).send(error.message);
    }
});
// Update aggregate products
app.patch('/products', async (request, response) => {
    const AGGREGATE_PRODUCTS_LIMIT = 10;
    const { remove, productUID, title, goal, creatorName, creatorUID, } = request.body;
    try {
        // Get previous aggregate data
        let { products } = await Products.read();
        if (remove === true) {
            // Filter product out of array
            products = products.filter((product) => product.productUID !== productUID);
        }
        else {
            // Insert new product
            products.unshift({
                productUID, title, goal, creatorName, creatorUID,
            });
            // If the amount of products has gone over the limit, remove last product
            if (products.length > AGGREGATE_PRODUCTS_LIMIT) {
                products.pop();
            }
        }
        // Update aggregate products
        await Products.update({ products });
        response.status(200).send('Successfully updated aggregate products');
    }
    catch (error) {
        response.status(400).send(error.message);
    }
});
// Update product
app.put('/products/:id', async (request, response) => {
    const { title, goal, creatorName, creatorUID, currentFunds, description, } = request.body;
    try {
        // Ensure the requesting user is the creator
        await Auth.verifyUser(request.get('Authorization'), creatorUID);
        // Update the product
        await Products.update({
            title, goal, creatorName, creatorUID, currentFunds, description,
        }, request.params.id);
        response.status(200).send('Successfully updated product');
    }
    catch (error) {
        response.status(400).send(error.message);
    }
});
// Delete product
app.delete('/products/:id', async (request, response) => {
    try {
        // Get the product creator's UID
        const { creatorUID } = await Products.read(request.params.id);
        // Ensure the requesting user is the creator
        await Auth.verifyUser(request.get('Authorization'), creatorUID);
        // Delete product
        await Products.delete(request.params.id);
        response.status(200).send('Successfully deleted product');
    }
    catch (error) {
        response.status(400).send(error.message);
    }
});
// User Routes
// Get one user
app.get('/users/:id', async (request, response) => {
    try {
        const user = await Users.read(request.params.id);
        response.json(user);
    }
    catch (error) {
        response.status(400).send(error.message);
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
    }
    catch (error) {
        response.status(400).send(error.message);
    }
});
// Stripe checkout session
app.post('/create-checkout-session/:id', async (request, response) => {
    const { pledgeAmount, pledgerUID } = request.body;
    try {
        // Remove commas and get the price in cents
        const priceInCents = Utils.toCents(pledgeAmount);
        await Auth.verifyUser(request.get('Authorization'), pledgerUID);
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product: 'prod_KhlefyN9lsd6AN',
                        unit_amount: priceInCents,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${SITE_URL}/products/${request.params.id}/${pledgeAmount}/success`,
            cancel_url: `${SITE_URL}/products/${request.params.id}`,
        });
        // eslint-disable-next-line camelcase
        if (session.url && (session === null || session === void 0 ? void 0 : session.payment_intent)) {
            // Save metadata to retrieve later
            const paymentIntent = await stripe.paymentIntents.update(session.payment_intent, {
                metadata: {
                    pledgeAmount, pledgerUID, productUID: request.params.id,
                },
            });
            response.json({ url: session.url, intent: paymentIntent.id });
        }
        else {
            response.status(500).send('There was an error with your request');
        }
    }
    catch (error) {
        response.status(400).send(error.message);
    }
});
app.post('/pledge', async (request, response) => {
    const { intent } = request.body;
    response.set({
        'Set-Cookie': `intent=${intent}; SameSite=Lax; Secure; HttpOnly`,
        'Access-Control-Allow-Credentials': 'true',
    });
    response.status(200).send('Set cookie');
});
app.post('/pledge/confirm', async (request, response) => {
    const intentId = request.cookies.intent;
    if (!intentId) {
        response.status(401).send();
    }
    try {
        const paymentIntent = await stripe.paymentIntents.retrieve(intentId);
        if (paymentIntent.status === 'succeeded') {
            const { metadata } = paymentIntent;
            // Get previous product data to update
            const product = await Products.read(metadata.productUID);
            // Add pledge amount to current funds as cents, then convert back to USD string
            product.currentFunds = ((Utils.toCents(product.currentFunds)
                + Utils.toCents(metadata.pledgeAmount)) / 100).toString();
            // Update product with new current funds total
            await Products.update(product, metadata.productUID);
            // Add pledge to user
            const user = await Users.read(metadata.pledgerUID);
            user.pledges.push({
                amount: metadata.pledgeAmount,
                product: {
                    productUID: metadata.productUID,
                    title: product.title,
                    goal: product.goal,
                    creatorName: product.creatorName,
                    creatorUID: product.creatorUID,
                },
            });
            await Users.update(Object.assign(Object.assign({}, user), { uid: metadata.pledgerUID }));
            // Clear intent cookie
            response.clearCookie('intent');
            response.status(200).send('Confirmation successful');
        }
    }
    catch (error) {
        response.status(400).send(error.message);
    }
});
const api = functions.https.onRequest(main);
export default api;
//# sourceMappingURL=index.js.map