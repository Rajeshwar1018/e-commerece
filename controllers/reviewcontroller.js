const express=require('express')
const reviewService = require('../services/reviewservice');




const reviewController = {
    
    getProductReviews: async (req, res) => {
        try {
            const { id: productId } = req.params;
            const reviews = await reviewService.getReviewsForProduct(productId);
            res.status(200).json(reviews);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

   
    addProductReview: async (req, res) => {
        try {
            const { id: productId } = req.params;
            const { user, rating, comment } = req.body;

            if (!user || !rating) {
                return res.status(400).json({ error: "User ID and rating are required" });
            }

            const newReview = await reviewService.addReview(productId, user, rating, comment);
            res.status(201).json(newReview);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = reviewController;
