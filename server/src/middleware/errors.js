/** Unknown /api route. */
export const notFound = (req, res) =>
    res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });

/** Central error handler: turns Mongoose / body-parser errors into meaningful HTTP responses. */
export const errorHandler = (err, req, res, _next) => {
    if (err.type === "entity.parse.failed") return res.status(400).json({ message: "Invalid JSON body" });
    if (err.name === "CastError") return res.status(400).json({ message: `Invalid ${err.path}` });
    if (err.name === "ValidationError") return res.status(400).json({ message: err.message });
    if (err.code === 11000) return res.status(409).json({ message: "A record with this id already exists" });
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
};
