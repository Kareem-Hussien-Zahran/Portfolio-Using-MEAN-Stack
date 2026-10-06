import { Component, ChangeDetectionStrategy, input, output, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NAV_ITEMS } from '@core/data/nav.data';
import { ActiveNavService } from '@core/services/active-nav.service';

@Component({
  selector: 'app-nav-links',
  imports: [RouterLink],
  templateUrl: './nav-links.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class NavLinks {
  readonly open = input(false);
  readonly navigated = output<void>();

  protected readonly items = NAV_ITEMS;
  protected readonly activeNav = inject(ActiveNavService);
}
