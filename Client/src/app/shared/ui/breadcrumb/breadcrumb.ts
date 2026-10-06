import { Component, ChangeDetectionStrategy, input, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NAV_ITEMS } from '@core/data/nav.data';
import { ActiveNavService } from '@core/services/active-nav.service';

@Component({
  selector: 'app-breadcrumb',
  imports: [RouterLink],
  templateUrl: './breadcrumb.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class Breadcrumb {
  /** Optional last crumb, e.g. the project title on a case-study page. */
  readonly current = input('');

  protected readonly activeNav = inject(ActiveNavService);
  protected readonly section = computed(
    () => NAV_ITEMS.find((n) => n.key === this.activeNav.active()) ?? { label: 'Page', path: '/' },
  );
}
