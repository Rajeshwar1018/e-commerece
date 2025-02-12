const express = require('express');
const cartController = require('../controllers/cartController');

const router = express.Router();

router.get('/getCart', cartController.getCartByUser);        // ✅ Get user's cart
router.post('/addToCart', cartController.addToCart);   // ✅ Add products to cart
router.put('/updateCart', cartController.updateCartItem);  // ✅ Update cart items
router.delete('/clearCart', cartController.clearCart); // ✅ Clear cart

module.exports = router;
