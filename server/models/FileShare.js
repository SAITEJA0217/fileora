const mongoose = require('mongoose');

const fileShareSchema = new mongoose.Schema({
  uniqueId: { type: String, required: true, unique: true },
  originalName: { type: String, required: true },
  filePath: { type: String, required: true },
  mimeType: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 86400 } // 24 hours
});

module.exports = mongoose.model('FileShare', fileShareSchema);
