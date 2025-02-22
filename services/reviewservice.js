const reviewQuery = require('../queries/reviewquery');
const review=require('../models/Review')



const reviewService = {
  
    getReviewsForProduct: async (productId) => {
        try {
            return await reviewQuery.getReviewsByProduct(productId);
        } catch (error) {
            throw new Error(`Error retrieving product reviews: ${error.message}`);
        }
    },

   
    addReview: async (productId, user, rating, comment) => {
        try {
            if (!rating || rating < 1 || rating > 5) {
                throw new Error("Rating must be between 1 and 5");
            }

            const reviewData = { product: productId, user, rating, comment };
            return await reviewQuery.addReview(reviewData);
        } catch (error) {
            throw new Error(`Error adding review: ${error.message}`);
        }
    }
};

module.exports = reviewService;
