import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { Brand } from '@layout/brand/brand';
import { NavLinks } from '@layout/nav-links/nav-links';
import { ThemeToggle } from '@layout/theme-toggle/theme-toggle';
import { MenuToggle } from '@layout/menu-toggle/menu-toggle';

@Component({
  selector: 'app-site-header',
  imports: [Brand, NavLinks, ThemeToggle, MenuToggle],
  templateUrl: './site-header.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class SiteHeader {
  protected readonly menuOpen = signal(false);
}
