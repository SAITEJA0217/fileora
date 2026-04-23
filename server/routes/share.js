const express = require('express');
const router = express.Router();
const FileShare = require('../models/FileShare');
const path = require('path');

router.get('/:uniqueId', async (req, res) => {
  try {
    const share = await FileShare.findOne({ uniqueId: req.params.uniqueId });
    if (!share) return res.status(404).send('Link expired or not found');

    res.sendFile(share.filePath);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
