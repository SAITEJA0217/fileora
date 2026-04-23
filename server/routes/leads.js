const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Public route to join early access
router.post('/join', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    let lead = await Lead.findOne({ email });
    if (lead) return res.status(400).json({ message: 'You are already on the list! 🚀' });

    lead = new Lead({ email });
    await lead.save();

    res.json({ message: 'Welcome to the nest! We will notify you soon. 🐣' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin route to view leads
router.get('/all', auth, admin, async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
