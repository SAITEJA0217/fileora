require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const fs = require('fs-extra');

const authRoutes = require('./routes/auth');
const paymentRoutes = require('./routes/payments');
const toolRoutes = require('./routes/tools');
const adminRoutes = require('./routes/admin');

const app = express();

// Security Middleware
app.use(helmet({
  contentSecurityPolicy: false, // For development ease
}));
app.use(cors());
app.use(express.json());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Ensure uploads dir exists
fs.ensureDirSync(path.join(__dirname, 'uploads'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/tools', toolRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/leads', require('./routes/leads'));
app.use('/f', require('./routes/share'));

// Health Check
app.get('/', (req, res) => res.send('FileOra API is singing 🚀'));

// Error Mapping
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong on our end!' });
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));
