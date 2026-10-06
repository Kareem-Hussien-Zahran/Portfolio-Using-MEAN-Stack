import { Component, ChangeDetectionStrategy, input, output, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-dashboard-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './dashboard-sidebar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class DashboardSidebar {
  readonly open = input(false);
  readonly navigate = output<void>();

  protected readonly auth = inject(AuthService);
  protected readonly items = [
    { path: '/admin', label: 'Overview', icon: '▦', exact: true },
    { path: '/admin/projects', label: 'Projects', icon: '◆', exact: false },
    { path: '/admin/skills', label: 'Skills', icon: '✦', exact: false },
    { path: '/admin/experience', label: 'Experience', icon: '◷', exact: false },
    { path: '/admin/profile', label: 'Profile', icon: '☺', exact: false },
    { path: '/admin/messages', label: 'Messages', icon: '✉', exact: false },
  ];
}
