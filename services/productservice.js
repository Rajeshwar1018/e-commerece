const db = require('../server'); // Import the database connection
const query = require('../queries/productquery');
const Product = require('../models/Product'); // ✅ Ensure the correct import


class ProductService {

  async createProduct(productData) {
    try {
        const newProduct = new Product(productData); // ✅ Create a new Mongoose document
        return await newProduct.save(); // ✅ Use `.save()` instead of `.query()`
    } catch (error) {
        console.error("Error inserting product:", error);
        throw error;
    }
}
  // Get all products
  async getAllProducts() {
    try {
        const products = await Product.find(); // ✅ Correct MongoDB method
        return products;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
}
  // Get product by ID
  async getProductById(productId) {
    try {
      const product = await Product.findById(productId); // ✅ Correct MongoDB method
      if (!product) {
        throw new Error(`Product with ID ${productId} not found`);
      }
      return product;
    } catch (error) {
      console.error('Error fetching product:', error.message);
      throw error;
    }
  }

  // Update product by ID
  async updateProduct(productId, data) {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(productId, data, {
        new: true, // Returns the updated document instead of the old one
        runValidators: true, // Ensures validation rules apply
      });
  
      if (!updatedProduct) {
        throw new Error("Product not found");
      }
  
      console.log("Updated product:", updatedProduct);
      return updatedProduct;
    } catch (error) {
      console.error("Error updating product:", error.message);
      throw error;
    }
  }

  // Delete product by ID
  async deleteProductById(productId) {
    try {
      const deletedProduct = await Product.findByIdAndDelete(productId);

      if (!deletedProduct) {
        throw new Error(`Product with ID ${productId} not found`);
      }

      console.log('Deleted product:', deletedProduct);
      return deletedProduct;
    } catch (error) {
      console.error('Error deleting product:', error.message);
      throw error;
    }
  }


  // Get products by filters (e.g., category, price range)
  async getProductsByFilter(filters) {
    try {
      let query = {}; // MongoDB query object

      if (filters.category) {
        query.category = filters.category;
      }
      if (filters.minPrice) {
        query.price = { ...query.price, $gte: filters.minPrice }; // Price >= minPrice
      }
      if (filters.maxPrice) {
        query.price = { ...query.price, $lte: filters.maxPrice }; // Price <= maxPrice
      }

      const products = await Product.find(query); // ✅ Mongoose Query
      return products;
    } catch (error) {
      console.error('Error fetching filtered products:', error.message);
      throw error;
    }
  }
}

module.exports = new ProductService();


