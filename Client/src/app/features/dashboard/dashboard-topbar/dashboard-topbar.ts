import { Component, ChangeDetectionStrategy, output } from '@angular/core';
import { ThemeToggle } from '@layout/theme-toggle/theme-toggle';

@Component({
  selector: 'app-dashboard-topbar',
  imports: [ThemeToggle],
  templateUrl: './dashboard-topbar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: block' },
})
export class DashboardTopbar {
  readonly menu = output<void>();
}
