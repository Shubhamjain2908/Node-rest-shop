const express = require('express');
const app = express();
const morgon = require('morgan');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/order');

//This tells express to log via morgan
app.use(morgon('dev'));

/**
 * middleware for a node app    
 * Routes which should handle requests
 */
app.use('/products', productRoutes);    // get to product route
app.use('/orders', orderRoutes);

//error handling : other than above requests
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);    // forward error reqest
});

// errors thrown from anywhere in this application
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});
module.exports = app;