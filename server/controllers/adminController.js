const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateUserPlan = async (req, res) => {
  try {
    const { userId, plan } = req.body;
    if (!['free', 'pro'].includes(plan)) {
      return res.status(400).json({ message: 'Invalid plan type' });
    }

    const user = await User.findByIdAndUpdate(
      userId, 
      { plan }, 
      { new: true }
    ).select('-password');
    
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    res.json({ message: `User plan updated to ${plan}`, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.toggleAdmin = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.isAdmin = !user.isAdmin;
    await user.save();
    
    res.json({ message: `Admin status toggled for ${user.email}`, isAdmin: user.isAdmin });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
