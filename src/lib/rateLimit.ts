const hits = new Map<string, { count: number; lastReset: number }>();

const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_HITS = 100;

export function rateLimit(ip: string) {
  const now = Date.now();
  const userData = hits.get(ip) || { count: 0, lastReset: now };

  // Reset if window has passed
  if (now - userData.lastReset > WINDOW_MS) {
    userData.count = 1;
    userData.lastReset = now;
  } else {
    userData.count++;
  }

  hits.set(ip, userData);

  if (userData.count > MAX_HITS) {
    throw new Error("Too many requests from this IP. Please try again in 15 minutes.");
  }
}
