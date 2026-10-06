/** Trimmed string, cut to `max` characters. Non-strings become "". */
export const str = (v, max = 5000) => (typeof v === "string" ? v.trim().slice(0, max) : "");

/** Array of non-empty trimmed strings. A multi-line string is split into lines. */
export const list = (v, max = 100) => {
    const arr = Array.isArray(v) ? v : typeof v === "string" ? v.split(/\r?\n/) : [];
    return arr.map((x) => str(x, 500)).filter(Boolean).slice(0, max);
};

/** Keeps only the listed keys from `body` (prevents mass-assignment of _id, timestamps, …). */
export const pick = (body, keys) =>
    Object.fromEntries(keys.filter((k) => body && k in body).map((k) => [k, body[k]]));

export const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
