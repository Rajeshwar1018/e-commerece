const express = require("express");
const OrderService = require('../services/orderservice');

class OrderController {
    
    // Place a new order
    async placeOrder(req, res) {
        try {
            const orderData = req.body;
            const order = await OrderService.placeOrder(orderData);
            res.status(201).json({ success: true, message: "Order placed successfully", data: order });
        } catch (error) {
            res.status(500).json({ success: false, message: "Error placing order", error: error.message });
        }
    }

    // Get all orders
    async getAllOrders(req, res) {
        try {
            const orders = await OrderService.getAllOrders();
            res.status(200).json({ success: true, data: orders });
        } catch (error) {
            res.status(500).json({ success: false, message: "Error fetching orders", error: error.message });
        }
    }

    // Get an order by ID
    async getOrderById(req, res) {
        try {
            const { orderId } = req.params;
            const order = await OrderService.getOrderById(orderId);
            res.status(200).json({ success: true, data: order });
        } catch (error) {
            res.status(404).json({ success: false, message: "Order not found", error: error.message });
        }
    }

    // Update an order by ID
    async updateOrder(req, res) {
        try {
            const { orderId } = req.params;
            const updateData = req.body;
            const updatedOrder = await OrderService.updateOrder(orderId, updateData);
            res.status(200).json({ success: true, message: "Order updated successfully", data: updatedOrder });
        } catch (error) {
            res.status(500).json({ success: false, message: "Error updating order", error: error.message });
        }
    }

    // Delete an order by ID
    async deleteOrder(req, res) {
        try {
            const { orderId } = req.params;
            await OrderService.deleteOrderById(orderId);
            res.status(200).json({ success: true, message: "Order deleted successfully" });
        } catch (error) {
            res.status(500).json({ success: false, message: "Error deleting order", error: error.message });
        }
    }

    // Get orders by status
    async getOrdersByStatus(req, res) {
        try {
            const { status } = req.params;
            const orders = await OrderService.getOrdersByStatus(status);
            res.status(200).json({ success: true, data: orders });
        } catch (error) {
            res.status(500).json({ success: false, message: "Error fetching orders by status", error: error.message });
        }
    }

    // Get orders by userId
    async getOrdersByUserId(req, res) {
        try {
            const { userId } = req.params;
            const orders = await OrderService.getOrdersByUserId(userId);
            res.status(200).json({ success: true, data: orders });
        } catch (error) {
            res.status(500).json({ success: false, message: "Error fetching orders for user", error: error.message });
        }
    }
}

module.exports = new OrderController();
