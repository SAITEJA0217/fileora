import jwt from 'jsonwebtoken';
import { headers, cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_change_this';

export async function verifyAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    // Fallback to Header for external tools/API testing
    const headersList = await headers();
    const authHeader = headersList.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const headerToken = authHeader.split(' ')[1];
      return verifyToken(headerToken);
    }
    return null;
  }

  return verifyToken(token);
}

function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    return decoded.id;
  } catch (err) {
    return null;
  }
}
