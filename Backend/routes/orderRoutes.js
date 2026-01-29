const express = require('express');
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus
} = require('../controllers/orderController');
const { protect } = require('../middlewares/authMiddleware');
const { adminOnly } = require('../middlewares/adminMiddleware');

// User
router.post('/', protect, createOrder);
router.get('/my', protect, getMyOrders);

// Admin
router.get('/admin', protect, adminOnly, getAllOrders);
router.put('/admin/:id', protect, adminOnly, updateOrderStatus);

module.exports = router;
