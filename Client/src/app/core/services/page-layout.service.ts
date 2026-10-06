import { DOCUMENT, Location } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

/**
 * Keeps the <body> class in sync with the current page:
 *  - `home-page` for the landing page (free-scrolling)
 *  - `fit-page`  for every other page (content is scaled to fit the viewport)
 */
@Injectable({ providedIn: 'root' })
export class PageLayoutService {
  private readonly body = inject(DOCUMENT).body;
  private readonly router = inject(Router);
  private readonly location = inject(Location);

  /** True on /admin/* – the public header/footer are hidden and nothing is scaled to fit. */
  readonly isAdmin = signal(false);

  init(): void {
    this.update(this.location.path());
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => this.update(e.urlAfterRedirects));
  }

  private update(url: string): void {
    const path = url.split(/[?#]/)[0];
    const isHome = path === '/' || path === '';
    const isAdmin = path === '/admin' || path.startsWith('/admin/');
    this.isAdmin.set(isAdmin);
    this.body.classList.toggle('home-page', isHome);
    this.body.classList.toggle('admin-page', isAdmin);
    this.body.classList.toggle('fit-page', !isHome && !isAdmin);
  }
}
