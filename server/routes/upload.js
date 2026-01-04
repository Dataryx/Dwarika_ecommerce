import express from 'express';
import upload from '../middleware/upload.js';
import { authenticate, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Upload single image
router.post('/image', authenticate, isAdmin, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Return the file path
    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({
      message: 'File uploaded successfully',
      url: fileUrl,
      filename: req.file.filename
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Upload multiple images
router.post('/images', authenticate, isAdmin, upload.array('images', 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    const files = req.files.map(file => ({
      url: `/uploads/${file.filename}`,
      filename: file.filename
    }));

    res.json({
      message: 'Files uploaded successfully',
      files: files
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

