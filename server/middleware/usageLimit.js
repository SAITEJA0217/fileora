const jwt = require('jsonwebtoken');
const User = require('../models/User');

const checkUsageLimit = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const today = new Date().setHours(0, 0, 0, 0);
    const lastUsage = new Date(user.lastUsageDate).setHours(0, 0, 0, 0);

    // Reset count if it's a new day
    if (today > lastUsage) {
      user.usageCount = 0;
      user.lastUsageDate = Date.now();
    }

    /* 
    // TEMPORARILY DISABLED FOR FREE LAUNCH
    if (user.plan === 'free' && user.usageCount >= 5) {
      return res.status(403).json({ 
        message: 'Daily limit reached. Upgrade to Pro for unlimited access.',
        limitType: 'usage'
      });
    }
    */

    req.currentUser = user; // Attach for controller use
    next();
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { checkUsageLimit };
