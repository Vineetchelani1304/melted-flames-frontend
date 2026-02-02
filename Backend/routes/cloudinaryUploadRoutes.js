const express = require('express');
const { protect, adminOnly } = require('../middlewares/authMiddleware');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

// Configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up multer storage with cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'meltedFlames/products',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ quality: 'auto' }],
  },
});
const upload = multer({ storage });

const router = express.Router();

// POST /api/upload/cloudinary (admin only)
router.post(
  '/cloudinary',
  protect,
  adminOnly,
  upload.single('image'),
  async (req, res) => {
    try {
      if (!req.file || !req.file.path) {
        return res.status(400).json({ message: 'No image uploaded' });
      }
      // Return the secure_url from Cloudinary (multer-storage-cloudinary puts it on req.file.path and req.file.filename, but the actual URL is in req.file.path and req.file.filename is the public_id)
      // However, multer-storage-cloudinary v4+ puts the Cloudinary response in req.file, including .path and .filename, but the actual URL is in req.file.path and req.file.filename is the public_id
      // To be robust, check for req.file.path and req.file.filename, but prefer req.file.path as the URL
      // But the best practice is to use req.file.path as the URL, but also check for req.file.secure_url if available
      const url = req.file.path || req.file.secure_url;
      if (!url || !url.startsWith('https://res.cloudinary.com/')) {
        return res.status(500).json({ message: 'Cloudinary upload failed' });
      }
      return res.json({ url });
    } catch (error) {
      return res.status(500).json({ message: 'Image upload failed' });
    }
  }
);

module.exports = router;
