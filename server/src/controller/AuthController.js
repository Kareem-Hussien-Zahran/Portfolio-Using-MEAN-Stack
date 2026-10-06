import { signToken, safeEqual } from "../utils/auth-token.js";

const TOKEN_TTL_SECONDS = 60 * 60 * 8; // 8 hours
const attempts = new Map(); // ip -> { count, resetAt }  (tiny in-memory brute-force guard)

/** POST /api/auth/login  { password }  →  { token, expiresIn } */
export const login = (req, res) => {
    const ip = req.ip;
    const now = Date.now();
    const entry = attempts.get(ip);
    if (entry && entry.resetAt > now && entry.count >= 5)
        return res.status(429).json({ message: "Too many attempts, try again in a minute" });

    if (!safeEqual(req.body?.password, process.env.ADMIN_PASSWORD)) {
        const e = entry && entry.resetAt > now ? entry : { count: 0, resetAt: now + 60_000 };
        e.count++;
        attempts.set(ip, e);
        return res.status(401).json({ message: "Wrong password" });
    }
    attempts.delete(ip);
    res.json({ token: signToken(process.env.AUTH_SECRET, TOKEN_TTL_SECONDS), expiresIn: TOKEN_TTL_SECONDS });
};

/** GET /api/auth/me – lets the dashboard check that a stored token is still valid. */
export const me = (_req, res) => res.json({ role: "admin" });
