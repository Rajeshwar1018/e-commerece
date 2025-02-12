const express = require("express");
const OrderService = require('../services/cartservice');

const cartController = {
    async addToCart(req, res) {
        try {
            const { user, products } = req.body; // Corrected field names
            if (!user || !products || !Array.isArray(products)) {
                return res.status(400).json({ error: "Invalid request data: user and products are required." });
            }

            const cart = await cartService.addToCart(user, products);
            res.status(200).json(cart);
        } catch (error) {
            console.error("Error adding to cart:", error);
            res.status(500).json({ error: error.message });
        }
    },

    async getCartByUser(req, res) {
        try {
            const { userId } = req.params;
            if (!userId) return res.status(400).json({ error: "User ID is required." });

            const cart = await cartService.getCartByUser(userId);
            res.status(200).json(cart);
        } catch (error) {
            console.error("Error fetching cart:", error);
            res.status(500).json({ error: error.message });
        }
    },

    async removeFromCart(req, res) {
        try {
            const { user, productId } = req.body;
            if (!user || !productId) return res.status(400).json({ error: "User ID and product ID are required." });

            const cart = await cartService.removeFromCart(user, productId);
            res.status(200).json(cart);
        } catch (error) {
            console.error("Error removing from cart:", error);
            res.status(500).json({ error: error.message });
        }
    },

    async clearCart(req, res) {
        try {
            const { userId } = req.params;
            if (!userId) return res.status(400).json({ error: "User ID is required." });

            await cartService.clearCart(userId);
            res.status(200).json({ message: "Cart cleared successfully" });
        } catch (error) {
            console.error("Error clearing cart:", error);
            res.status(500).json({ error: error.message });
        }
    },

    async updateCartItem(req, res) {
        try {
            const { user, productId, quantity } = req.body;
            if (!user || !productId || quantity == null) {
                return res.status(400).json({ error: "User ID, product ID, and quantity are required." });
            }

            const cart = await cartService.updateCartItem(user, productId, quantity);
            res.status(200).json(cart);
        } catch (error) {
            console.error("Error updating cart:", error);
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = cartController;
