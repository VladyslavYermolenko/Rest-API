const express = require('express');
const app = express();
const router = require('./routes');

function logRequest({ method, url }, _, next) {
    console.log(`[${new Date().toLocaleString()}] ${method} ${url}`);
    next();
}

app.use(express.json());
app.use(logRequest);
app.use(router);

module.exports = app;

// done