import { Component, ChangeDetectionStrategy, input, output, signal, computed } from '@angular/core';
import { DatePipe } from '@angular/common';
import { InboxMessage } from '@core/models/contact.model';

@Component({
  selector: 'app-message-item',
  imports: [DatePipe],
  templateUrl: './message-item.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class MessageItem {
  readonly message = input.required<InboxMessage>();
  /** Emitted when an unread message is expanded (the parent marks it as read). */
  readonly opened = output<void>();
  readonly toggleRead = output<void>();
  readonly remove = output<void>();

  protected readonly open = signal(false);
  protected readonly reply = computed(() => {
    const m = this.message();
    return `mailto:${m.email}?subject=${encodeURIComponent('Re: ' + (m.subject || 'Your message'))}`;
  });

  protected toggle(): void {
    this.open.update((v) => !v);
    if (this.open() && !this.message().read) this.opened.emit();
  }
}
