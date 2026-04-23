const mongoose = require('mongoose');
const User = require('./models/User');
const Lead = require('./models/Lead');
require('dotenv').config();

const cleanup = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for cleanup ✅');

    // 1. Remove all leads
    const leadCount = await Lead.countDocuments();
    await Lead.deleteMany({});
    console.log(`Removed ${leadCount} leads. 🧹`);

    // 2. Remove users except the main admin
    const adminEmail = 'ksrsaiteja@gmail.com';
    const userCount = await User.countDocuments({ email: { $ne: adminEmail } });
    await User.deleteMany({ email: { $ne: adminEmail } });
    console.log(`Removed ${userCount} users (kept ${adminEmail}). 🧹`);

    console.log('Database cleanup complete! ✨');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

cleanup();
