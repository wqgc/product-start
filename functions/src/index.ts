import * as functions from 'firebase-functions';
import express from 'express';

const app = express();
const main = express();

// Middleware
main.use('/api/v1', app);

// Routes
app.get('/hello', (_request, response) => {
    response.send('hello from hello!');
});

const api = functions.https.onRequest(main);
export default api;
