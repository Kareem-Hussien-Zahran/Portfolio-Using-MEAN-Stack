/** Body of `POST /api/contact`. The server requires name, email and message. */
export interface ContactMessage {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

/** `201 { message: "Message received" }` or `400 { message: "Required fields missing" }`. */
export interface ApiMessage {
  message: string;
}

/** A stored message as returned by the admin inbox `GET /api/contact`. */
export interface InboxMessage {
  _id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  read: boolean;
  createdAt: string;
}
