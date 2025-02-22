const Order = require('../models/Order');
const query = {
    // Insert a new order
    insertNewOrder: (data) => {
        const fields = Object.keys(data);
        const placeholders = fields.map(() => `?`).join(", ");

        return {
            sql: `INSERT INTO \`orders\` (${fields.map((field) => `\`${field}\``).join(", ")}) 
                  VALUES (${placeholders})`,
            values: fields.map((field) => data[field]),
        };
    },

    // Get all orders
    getAllOrders: () => {
        return {
            sql: `SELECT * FROM orders`
        };
    },

    // Get an order by ID
    getOrderById: (orderId) => {
        return {
            sql: `SELECT * FROM \`orders\` WHERE \`id\` = ?`,
            values: [orderId],
        };
    },

    // Update an order by ID
    updateOrder: (id, data) => {
        const updates = Object.keys(data)
            .map((field) => `\`${field}\` = ?`)
            .join(", ");

        return {
            sql: `UPDATE \`orders\` SET ${updates} WHERE \`id\` = ?`,
            values: [...Object.values(data), id],
        };
    },

    // Delete an order by ID
    deleteOrderById: (orderId) => {
        return {
            sql: `DELETE FROM \`orders\` WHERE \`id\` = ?`,
            values: [orderId],
        };
    }
};

module.exports = query;
