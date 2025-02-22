const Review = require('../models/Product');

const query = {
  
    // Insert a new product
    insertNewProduct: (data) => {
        const fields = Object.keys(data);
        const placeholders = fields.map(() => `?`).join(", ");

        return {
            sql: `INSERT INTO \`products\` (${fields.map((field) => `\`${field}\``).join(", ")}) 
                  VALUES (${placeholders})`,
            values: fields.map((field) => data[field]),
        };
    },

    // Get all products
    getAllProducts: () => {
        return {
            sql: `SELECT * FROM products`
        };
    },

    // Get a product by ID
    getProductById: (productId) => {
        return {
            sql: `SELECT * FROM \`products\` WHERE \`id\` = ?`,
            values: [productId],
        };
    },

    // Update a product by ID
    updateProduct: (id, data) => {
        const updates = Object.keys(data)
            .map((field) => `\`${field}\` = ?`)
            .join(", ");

        return {
            sql: `UPDATE \`products\` SET ${updates} WHERE \`id\` = ?`,
            values: [...Object.values(data), id],
        };
    },

    // Delete a product by ID
    deleteProductById: (productId) => {
        return {
            sql: `DELETE FROM \`products\` WHERE \`id\` = ?`,
            values: [productId],
        };
    }

};

module.exports = query;

