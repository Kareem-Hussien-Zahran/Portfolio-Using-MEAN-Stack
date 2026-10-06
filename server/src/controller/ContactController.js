import { ContactMessage } from "../models/ContactMessage.js";
import { isEmail, str } from "../utils/sanitize.js";

/** POST /api/contact – public contact form. Requires name, email and message. */
export const createContact = async (req, res) => {
    const name = str(req.body?.name, 120);
    const email = str(req.body?.email, 200);
    const message = str(req.body?.message, 5000);
    const subject = str(req.body?.subject, 200);
    if (!name || !email || !message) return res.status(400).json({ message: "Required fields missing" });
    if (!isEmail(email)) return res.status(400).json({ message: "Invalid email address" });
    await ContactMessage.create({ name, email, subject, message });
    res.status(201).json({ message: "Message received" });
};

/** GET /api/contact (admin) – inbox, newest first. */
export const getMessages = async (_req, res) => {
    res.json(await ContactMessage.find().sort({ createdAt: -1 }).lean());
};

/** PATCH /api/contact/:id (admin) – body `{ read: true|false }`. */
export const setMessageRead = async (req, res) => {
    const msg = await ContactMessage.findByIdAndUpdate(req.params.id, { read: req.body?.read !== false }, { new: true }).lean();
    if (!msg) return res.status(404).json({ message: "Message not found" });
    res.json(msg);
};

/** DELETE /api/contact/:id (admin) */
export const deleteMessage = async (req, res) => {
    const msg = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!msg) return res.status(404).json({ message: "Message not found" });
    res.status(204).end();
};
