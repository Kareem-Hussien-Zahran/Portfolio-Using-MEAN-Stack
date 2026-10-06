import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ConfirmService } from '@core/services/confirm.service';
import { ModalDialog } from '@features/dashboard/modal-dialog/modal-dialog';

@Component({
  selector: 'app-confirm-host',
  imports: [ModalDialog],
  templateUrl: './confirm-host.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class ConfirmHost {
  protected readonly confirm = inject(ConfirmService);
}
