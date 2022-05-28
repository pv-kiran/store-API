const express = require('express');
const router = express.Router();
const {getAllProducts , searchProducts} = require('../controllers/productController')


router.get('/all' , getAllProducts)

router.get('/search' , searchProducts );
module.exports = router;