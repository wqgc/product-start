import * as functions from 'firebase-functions';
import firebase from 'firebase-admin';
import express from 'express';
import Products from './models/Products.js';

firebase.initializeApp();
const app = express();
const main = express();

// Middleware
main.use('/api/v1', app);

// Product Routes
// Get all products
app.get('/products', async (_request, response) => {
    // const products = await Products.read();
    response.json(Products.test());
});

// Get one product
app.get('/products/:id', (_request, response) => {
    response.send('');
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
// Get all users
app.get('/users', (_request, response) => {
    response.send('');
});

// Get one user
app.get('/users/:id', (_request, response) => {
    response.send('');
});

// Auth Routes
app.post('/register', (_request, response) => {
    response.send('');
});

app.get('/login', (_request, response) => {
    response.send('');
});

app.get('/logout', (_request, response) => {
    response.send('');
});

const api = functions.https.onRequest(main);
export default api;
