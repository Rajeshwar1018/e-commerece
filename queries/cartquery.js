const Cart = require("../models/Cart");

const cartQueries = {
    // ✅ Add product to cart (create cart if not exists)
    async addToCart(userId, productId, quantity) {
        try {
            let cart = await Cart.findOne({ user: userId });

            if (!cart) {
                cart = new Cart({ user: userId, products: [{ productId, quantity }] });
            } else {
                const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
                if (productIndex > -1) {
                    cart.products[productIndex].quantity += quantity;
                } else {
                    cart.products.push({ productId, quantity });
                }
            }

            cart.updatedAt = new Date();
            return await cart.save();
        } catch (error) {
            throw new Error(`Error adding to cart: ${error.message}`);
        }
    },

    // ✅ Get cart by user
    async getCartByUser(userId) {
        try {
            return await Cart.findOne({ user: userId }).populate("products.productId");
        } catch (error) {
            throw new Error(`Error retrieving cart: ${error.message}`);
        }
    },

    // ✅ Remove product from cart
    async removeFromCart(userId, productId) {
        try {
            const cart = await Cart.findOne({ user: userId });
            if (!cart) throw new Error("Cart not found");

            cart.products = cart.products.filter(p => p.productId.toString() !== productId);
            cart.updatedAt = new Date();
            return await cart.save();
        } catch (error) {
            throw new Error(`Error removing from cart: ${error.message}`);
        }
    },

    // ✅ Clear cart
    async clearCart(userId) {
        try {
            return await Cart.findOneAndDelete({ user: userId });
        } catch (error) {
            throw new Error(`Error clearing cart: ${error.message}`);
        }
    },

    // ✅ Update cart item quantity
    async updateCartItem(userId, productId, quantity) {
        try {
            const cart = await Cart.findOne({ user: userId });
            if (!cart) throw new Error("Cart not found");

            const product = cart.products.find(p => p.productId.toString() === productId);
            if (!product) throw new Error("Product not in cart");

            product.quantity = quantity;
            cart.updatedAt = new Date();
            return await cart.save();
        } catch (error) {
            throw new Error(`Error updating cart: ${error.message}`);
        }
    }
};

module.exports = cartQueries;
