const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');
const { protect } = require('../middlewares/authMiddleware');
const { adminOnly } = require('../middlewares/adminMiddleware');

// Public
router.get('/', getAllProducts);
router.get('/:id', getProductById);

// Admin
router.post('/admin', protect, adminOnly, createProduct);
router.put('/admin/:id', protect, adminOnly, updateProduct);
router.delete('/admin/:id', protect, adminOnly, deleteProduct);

module.exports = router;
