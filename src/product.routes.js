const express = require('express');
const products = require('./products');
const { blockSpecialBrand } = require('./middleware');

const router = express.Router();

// handle get request for path /products
router.get('/products', (request, response) => {
    return response.json(products);
});

// handle get request for path /products/:param
router.get('/products/:param', blockSpecialBrand, (request, response) => {
    const param = request.params; // Access the brand parameter from the URL
    let filteredProducts = [];
    // Filter products based on the id or brand parameter
    products.forEach(product => {
        if (product.id == param.param || product.brand == param.param) {
            filteredProducts.push(product);
        }
    });

    response.json(filteredProducts); // Send the filtered products as a JSON response
});

router.get('/productswitherror', (request, response) => {
    let err = new Error("processing error ")
    err.statusCode = 400
    throw err
});


module.exports = router;

