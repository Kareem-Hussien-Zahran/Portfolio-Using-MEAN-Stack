import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardSidebar } from '@features/dashboard/dashboard-sidebar/dashboard-sidebar';
import { DashboardTopbar } from '@features/dashboard/dashboard-topbar/dashboard-topbar';
import { ToastHost } from '@features/dashboard/toast-host/toast-host';
import { ConfirmHost } from '@features/dashboard/confirm-host/confirm-host';

@Component({
  selector: 'app-dashboard-shell',
  imports: [RouterOutlet, DashboardSidebar, DashboardTopbar, ToastHost, ConfirmHost],
  templateUrl: './dashboard-shell.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: block' },
})
export class DashboardShell {
  protected readonly menuOpen = signal(false);
}
