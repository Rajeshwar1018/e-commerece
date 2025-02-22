const Cart = require("../models/Cart");
const query=require("../queries/cartquery")

class CartService {
    /**
     * Add items to the cart
     * @param {Object} cartData - The cart data containing user and products array
     * @returns {Object} - Updated cart
     */
    async addToCart(cartData) {
        try {
            let cart = await Cart.findOne({ user: cartData.user });

            // If no cart exists, create a new one
            if (!cart) {
                cart = new Cart({ user: cartData.user, products: [] });
            }

            // Loop through products to update existing quantities or add new ones
            cartData.products.forEach((newProduct) => {
                const existingProduct = cart.products.find(
                    (p) => p.productId.toString() === newProduct.productId
                );

                if (existingProduct) {
                    existingProduct.quantity += newProduct.quantity;
                } else {
                    cart.products.push(newProduct);
                }
            });

            cart.updatedAt = new Date();
            return await cart.save();
        } catch (error) {
            throw new Error("Error adding item to cart: " + error.message);
        }
    }

    /**
     * Get cart details by user ID
     * @param {String} userId - User's ID
     * @returns {Object} - Cart details
     */
    async getCartByUserId(userId) {
        try {
            return await Cart.findOne({ user: userId }).populate("products.productId");
        } catch (error) {
            throw new Error("Error retrieving cart: " + error.message);
        }
    }

    /**
     * Remove a product from the cart
     * @param {String} userId - User's ID
     * @param {String} productId - Product ID to remove
     * @returns {Object} - Updated cart
     */
    async removeFromCart(userId, productId) {
        try {
            const cart = await Cart.findOne({ user: userId });

            if (!cart) {
                throw new Error("Cart not found for this user.");
            }

            cart.products = cart.products.filter(
                (item) => item.productId.toString() !== productId
            );

            cart.updatedAt = new Date();
            return await cart.save();
        } catch (error) {
            throw new Error("Error removing item from cart: " + error.message);
        }
    }

    /**
     * Clear the entire cart for a user
     * @param {String} userId - User's ID
     * @returns {Object} - Success message
     */
    async clearCart(userId) {
        try {
            const cart = await Cart.findOne({ user: userId });

            if (!cart) {
                throw new Error("Cart not found for this user.");
            }

            cart.products = [];
            cart.updatedAt = new Date();
            await cart.save();

            return { message: "Cart cleared successfully." };
        } catch (error) {
            throw new Error("Error clearing cart: " + error.message);
        }
    }
}

module.exports = new CartService();
