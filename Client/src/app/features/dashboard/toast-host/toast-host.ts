import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ToastService } from '@core/services/toast.service';

@Component({
  selector: 'app-toast-host',
  templateUrl: './toast-host.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class ToastHost {
  protected readonly toast = inject(ToastService);
}
