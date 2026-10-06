import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../config/api.config';
import { ApiMessage, ContactMessage, InboxMessage } from '../models/contact.model';

@Injectable({ providedIn: 'root' })
export class ContactApi {
  private readonly http = inject(HttpClient);
  private readonly base = inject(API_BASE_URL);

  /** `POST /api/contact` → `201 { message }`; `400` when name, email or message is missing/invalid. */
  send(body: ContactMessage): Observable<ApiMessage> {
    return this.http.post<ApiMessage>(`${this.base}/contact`, body);
  }

  /** `GET /api/contact` (admin) – inbox, newest first. */
  inbox(): Observable<InboxMessage[]> {
    return this.http.get<InboxMessage[]>(`${this.base}/contact`);
  }

  /** `PATCH /api/contact/:id { read }` (admin) */
  setRead(id: string, read: boolean): Observable<InboxMessage> {
    return this.http.patch<InboxMessage>(`${this.base}/contact/${id}`, { read });
  }

  /** `DELETE /api/contact/:id` (admin) → 204. */
  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/contact/${id}`);
  }
}
