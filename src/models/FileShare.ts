import mongoose from 'mongoose';

const fileShareSchema = new mongoose.Schema({
  uniqueId: { type: String, required: true, unique: true, index: true },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    index: true,
    required: false // Optional for anonymous shares
  },
  originalName: { type: String, required: true },
  filePath: { type: String, required: true },
  mimeType: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 86400 } // 24 hours
}, { 
  timestamps: true 
});

export default mongoose.models.FileShare || mongoose.model('FileShare', fileShareSchema);
