import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    index: true
  },
  source: {
    type: String,
    default: 'early_access'
  }
}, { 
  timestamps: true 
});

export default mongoose.models.Lead || mongoose.model('Lead', leadSchema);
