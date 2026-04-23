const express = require('express');
const router = express.Router();
const toolsController = require('../controllers/toolsController');
const auth = require('../middleware/auth');
const { checkUsageLimit } = require('../middleware/usageLimit');
const multer = require('multer');
const path = require('path');
const User = require('../models/User');

// Configure Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({
  storage,
  limits: {
    fileSize: async (req, file, cb) => {
      // Dynamic limit check based on plan
      const user = await User.findById(req.user.id);
      const maxSize = user.plan === 'pro' ? 2 * 1024 * 1024 * 1024 : 50 * 1024 * 1024;
      cb(null, maxSize);
    }
  }
});

router.post('/usage-check', auth, checkUsageLimit, (req, res) => {
  // If checkUsageLimit passes, just increment and return success
  req.currentUser.usageCount += 1;
  req.currentUser.save();
  res.json({ success: true, usageCount: req.currentUser.usageCount });
});

router.post('/merge-pdf', auth, checkUsageLimit, upload.array('files', 10), toolsController.mergePdf);
router.post('/pdf-to-word', auth, checkUsageLimit, upload.single('file'), toolsController.pdfToWord);
router.post('/image-to-pdf', auth, checkUsageLimit, upload.array('files', 10), toolsController.imageToPdf);
router.post('/fix-file', auth, checkUsageLimit, upload.single('file'), toolsController.fixFile);
router.post('/share-link', auth, checkUsageLimit, upload.single('file'), toolsController.generateShareLink);
router.post('/chat-ai', auth, toolsController.chatWithFile);

module.exports = router;
