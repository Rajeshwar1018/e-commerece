const express=require('express');
const productservice=require('../services/productservice');

class ProductController {
  
  // Create a new product
  async createProduct(req, res) {
    try {
      const productData = req.body;

      // Input validation
      if (!productData || Object.keys(productData).length === 0) {
        return res.status(400).json({ error: "Product data is required" });
      }

      const result = await productService.createProduct(productData);

      return res.status(201).json({
        message: "Product created successfully",
        data: result
      });
    } catch (error) {
      console.error("Error creating product:", error);
      return res.status(500).json({
        error: "Failed to create product",
        details: error.message
      });
    }
  }

  // Get all products
  async getAllProducts(req, res) {
    try {
      const result = await productService.getAllProducts();

      return res.status(200).json({
        message: "Products fetched successfully",
        data: result
      });
    } catch (error) {
      console.error("Error fetching products:", error);
      return res.status(500).json({
        error: "Failed to fetch products",
        details: error.message
      });
    }
  }

  // Get product by ID
  async getProductById(req, res) {
    try {
      let { id: productId } = req.params;

      productId = parseInt(productId, 10);
      if (isNaN(productId)) {
        return res.status(400).json({
          error: "Invalid product ID. It must be a numeric value."
        });
      }

      const result = await productService.getProductById(productId);

      return res.status(200).json({
        message: "Product fetched successfully",
        data: result
      });
    } catch (error) {
      consbole.error("Error fetching product:", error);
      return res.status(500).json({
        error: "Failed to fetch product",
        details: error.message
      });
    }
  }

  // Update product by ID
  async updateProduct(req, res) {
    try {
      let { id: productId } = req.params;

      productId = parseInt(productId, 10);
      if (isNaN(productId)) {
        return res.status(400).json({
          error: "Invalid product ID. It must be a numeric value."
        });
      }

      const productData = req.body;
      await productService.updateProduct(productId, productData);
      const updatedProduct = await productService.getProductById(productId);

      return res.status(200).json({
        message: "Product updated successfully",
        data: updatedProduct
      });
    } catch (error) {
      console.error("Error updating product:", error);
      return res.status(500).json({
        error: "Failed to update product",
        details: error.message
      });
    }
  }

  // Delete product by ID
  async deleteProduct(req, res) {
    try {
      let { id: productId } = req.params;

      productId = parseInt(productId, 10);
      if (isNaN(productId)) {
        return res.status(400).json({
          error: "Invalid product ID. It must be a numeric value."
        });
      }

      await productService.deleteProductById(productId);

      return res.status(200).json({
        message: "Product deleted successfully"
      });
    } catch (error) {
      console.error("Error deleting product:", error);
      return res.status(500).json({
        error: "Failed to delete product",
        details: error.message
      });
    }
  }

  // Get products by filters (category, price range)
  async getProductsByFilter(req, res) {
    try {
      let filters = {};

      if (req.query.category) {
        filters.category = req.query.category.trim();
      }
      if (req.query.minPrice) {
        filters.minPrice = parseFloat(req.query.minPrice);
      }
      if (req.query.maxPrice) {
        filters.maxPrice = parseFloat(req.query.maxPrice);
      }

      const result = await productService.getProductsByFilter(filters);

      return res.status(200).json({
        message: "Filtered products fetched successfully",
        data: result
      });
    } catch (error) {
      console.error("Error fetching filtered products:", error);
      return res.status(500).json({
        error: "Failed to fetch filtered products",
        details: error.message
      });
    }
  }
}

module.exports = new ProductController();
