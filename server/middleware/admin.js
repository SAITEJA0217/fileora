const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (user && user.isAdmin) {
      next();
    } else {
      res.status(403).json({ message: 'Access denied. Admin rights required.' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error during admin verification' });
  }
};
