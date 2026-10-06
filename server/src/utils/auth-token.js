import crypto from "node:crypto";

const b64 = (buf) => Buffer.from(buf).toString("base64url");

/** Creates a signed, expiring admin token: `<payload>.<hmac-sha256>` (no external dependency). */
export const signToken = (secret, ttlSeconds) => {
    const payload = b64(JSON.stringify({ role: "admin", exp: Date.now() + ttlSeconds * 1000 }));
    const sig = crypto.createHmac("sha256", secret).update(payload).digest("base64url");
    return `${payload}.${sig}`;
};

/** Returns the payload when the token is authentic and not expired, otherwise `null`. */
export const verifyToken = (secret, token) => {
    if (typeof token !== "string" || !token.includes(".")) return null;
    const [payload, sig] = token.split(".");
    const expected = crypto.createHmac("sha256", secret).update(payload).digest("base64url");
    const a = Buffer.from(sig ?? "");
    const b = Buffer.from(expected);
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
    try {
        const data = JSON.parse(Buffer.from(payload, "base64url").toString());
        return data.exp > Date.now() ? data : null;
    } catch {
        return null;
    }
};

export const safeEqual = (x, y) => {
    const a = Buffer.from(String(x ?? ""));
    const b = Buffer.from(String(y ?? ""));
    return a.length === b.length && crypto.timingSafeEqual(a, b);
};
