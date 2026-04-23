const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const makeAdmin = async (email) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB ✅');

    const user = await User.findOneAndUpdate(
      { email: email },
      { isAdmin: true },
      { new: true }
    );

    if (user) {
      console.log(`Success! ${email} is now an Admin. 👑`);
    } else {
      console.log('User not found. ❌');
    }

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

// Replace with your email
const emailToPromote = process.argv[2];
if (!emailToPromote) {
  console.log('Please provide an email: node makeAdmin.js your@email.com');
  process.exit();
}

makeAdmin(emailToPromote);
