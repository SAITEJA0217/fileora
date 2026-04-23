import { verifyAuth } from './auth';
import { connectDB } from './mongodb';
import User from '@/models/User';

export async function verifyAdmin() {
  const userId = await verifyAuth();
  if (!userId) return null;

  await connectDB();
  const user = await User.findById(userId);
  
  if (user && (user.isAdmin || user.email === 'ksrsaiteja@gmail.com')) {
    return userId;
  }

  return null;
}
