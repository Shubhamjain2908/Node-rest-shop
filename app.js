const express = require('express');
const app = express();
const morgon = require('morgan');
const bodyParser = require('body-parser');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/order');

//This tells express to log via morgan
app.use(morgon('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

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