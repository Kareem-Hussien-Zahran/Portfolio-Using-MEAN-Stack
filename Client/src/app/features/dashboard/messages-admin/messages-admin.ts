import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { valueOr } from '@core/utils/resource';
import { ContactApi } from '@core/api/contact.api';
import { InboxMessage } from '@core/models/contact.model';
import { ToastService } from '@core/services/toast.service';
import { ConfirmService } from '@core/services/confirm.service';
import { serverMessage } from '@core/utils/http-error';
import { AdminPageHeader } from '@features/dashboard/admin-page-header/admin-page-header';
import { ApiState } from '@shared/ui/api-state/api-state';
import { MessageItem } from '@features/dashboard/message-item/message-item';

@Component({
  selector: 'app-messages-admin',
  imports: [AdminPageHeader, ApiState, MessageItem],
  templateUrl: './messages-admin.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class MessagesAdmin {
  private readonly api = inject(ContactApi);
  private readonly toast = inject(ToastService);
  private readonly confirm = inject(ConfirmService);

  protected readonly inbox = rxResource({ stream: () => this.api.inbox() });
  protected readonly filter = signal<'all' | 'unread'>('all');
  protected readonly items = computed(() => valueOr(this.inbox, []));
  protected readonly unread = computed(() => this.items().filter((m) => !m.read).length);
  protected readonly visible = computed(() => (this.filter() === 'unread' ? this.items().filter((m) => !m.read) : this.items()));

  protected setRead(m: InboxMessage, read: boolean): void {
    if (m.read === read) return;
    this.api.setRead(m._id, read).subscribe({
      next: () => this.inbox.reload(),
      error: (err) => this.toast.error(serverMessage(err, 'Could not update the message')),
    });
  }

  protected async remove(m: InboxMessage): Promise<void> {
    if (!(await this.confirm.ask(`Delete the message from ${m.name}?`))) return;
    this.api.remove(m._id).subscribe({
      next: () => {
        this.toast.success('Message deleted');
        this.inbox.reload();
      },
      error: (err) => this.toast.error(serverMessage(err, 'Could not delete the message')),
    });
  }
}
