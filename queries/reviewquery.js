const Review = require('../models/Review');

const reviewQuery = {
   
    getReviewsByProduct: async (productId) => {
        try {
            return await Review.find({ product: productId })
                .populate('user', 'name email') // Populating user info (name and email)
                .sort({ createdAt: -1 }); // Sorting by most recent
        } catch (error) {
            throw new Error(`Error fetching reviews: ${error.message}`);
        }
    },

    
    addReview: async (reviewData) => {
        try {
            const newReview = new Review(reviewData);
            return await newReview.save();
        } catch (error) {
            throw new Error(`Error adding review: ${error.message}`);
        }
    }
};

module.exports = reviewQuery;
