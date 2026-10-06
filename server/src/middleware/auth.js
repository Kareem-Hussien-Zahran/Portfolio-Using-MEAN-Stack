import { verifyToken } from "../utils/auth-token.js";

/** Protects admin routes. Expects `Authorization: Bearer <token>` issued by POST /api/auth/login. */
export const requireAdmin = (req, res, next) => {
    const header = req.headers.authorization ?? "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : "";
    if (!verifyToken(process.env.AUTH_SECRET, token))
        return res.status(401).json({ message: "Unauthorized" });
    next();
};
