const db=require('../server')
const Order = require('../models/Order'); // Import the Order model
const query = require('../queries/orderquery');



class OrderService {

  // Place a new order
  async placeOrder(orderData) {
    try {
      const newOrder = new Order(orderData);
      return await newOrder.save(); // Save order in MongoDB
    } catch (error) {
      console.error("Error placing order:", error);
      throw error;
    }
  }

  // Get all orders
  async getAllOrders() {
    try {
      return await Order.find(); // Retrieve all orders
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  }

  // Get order by ID
  async getOrderById(orderId) {
    try {
      const order = await Order.findById(orderId);
      if (!order) {
        throw new Error(`Order with ID ${orderId} not found`);
      }
      return order;
    } catch (error) {
      console.error("Error fetching order:", error.message);
      throw error;
    }
  }

  // Update order by ID
  async updateOrder(orderId, data) {
    try {
      const updatedOrder = await Order.findByIdAndUpdate(orderId, data, {
        new: true, // Return updated document
        runValidators: true, // Apply validation
      });

      if (!updatedOrder) {
        throw new Error("Order not found");
      }

      console.log("Updated order:", updatedOrder);
      return updatedOrder;
    } catch (error) {
      console.error("Error updating order:", error.message);
      throw error;
    }
  }

  // Delete order by ID
  async deleteOrderById(orderId) {
    try {
      const deletedOrder = await Order.findByIdAndDelete(orderId);

      if (!deletedOrder) {
        throw new Error(`Order with ID ${orderId} not found`);
      }

      console.log("Deleted order:", deletedOrder);
      return deletedOrder;
    } catch (error) {
      console.error("Error deleting order:", error.message);
      throw error;
    }
  }

  // Get orders by status
  async getOrdersByStatus(status) {
    try {
      return await Order.find({ status });
    } catch (error) {
      console.error("Error fetching orders by status:", error.message);
      throw error;
    }
  }

  // Get orders by userId
  async getOrdersByUserId(userId) {
    try {
      return await Order.find({ userId });
    } catch (error) {
      console.error("Error fetching orders by user:", error.message);
      throw error;
    }
  }
}

module.exports = new OrderService();
