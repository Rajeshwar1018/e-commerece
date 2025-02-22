const express = require('express');
const getReviewController = require('../controllers/reviewcontroller');
const postReviewController = require('../controllers/reviewcontroller');

const router = express.Router();

router.get('/products/:id/reviews', getReviewController.getProductReviews);
router.post('/products/:id/reviews', postReviewController.addProductReview);

module.exports = router;
