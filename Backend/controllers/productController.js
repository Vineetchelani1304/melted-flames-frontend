const Product = require('../models/Product');

// Get all products (public)
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({
      stock: { $gt: 0 }
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get product by ID (public)
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create product (admin only)
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category, images, stock } = req.body;
    if (!name || !description || !price || !category || !images || stock == null) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    // Only allow Cloudinary URLs
    if (!Array.isArray(images) || images.length === 0 || images.some(url => typeof url !== 'string' || !url.startsWith('https://res.cloudinary.com/'))) {
      return res.status(400).json({ message: 'Product images must be Cloudinary URLs' });
    }
    const product = new Product({ name, description, price, category, images, stock });
    await product.save();
    console.log("Product created:", product);
    res.status(201).json(product);
  } 
  catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update product (admin only)
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    // If images are being updated, only allow Cloudinary URLs
    if (updates.images) {
      if (!Array.isArray(updates.images) || updates.images.length === 0 || updates.images.some(url => typeof url !== 'string' || !url.startsWith('https://res.cloudinary.com/'))) {
        return res.status(400).json({ message: 'Product images must be Cloudinary URLs' });
      }
    }
    const product = await Product.findByIdAndUpdate(id, updates, { new: true });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete product (admin only)
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
