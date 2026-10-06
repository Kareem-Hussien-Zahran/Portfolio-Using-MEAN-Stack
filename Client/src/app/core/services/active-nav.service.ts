import { Injectable, inject, signal } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { NavKey } from '../models/nav.model';

/**
 * Exposes which top-level navigation item the current route belongs to.
 * Each route declares it with `data: { nav: '...' }` (e.g. the ML page belongs to "projects").
 */
@Injectable({ providedIn: 'root' })
export class ActiveNavService {
  private readonly router = inject(Router);
  readonly active = signal<NavKey>('home');

  constructor() {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => this.active.set(this.read(this.router.routerState.snapshot.root)));
  }

  private read(route: ActivatedRouteSnapshot): NavKey {
    let current: ActivatedRouteSnapshot | null = route;
    let nav: NavKey = 'home';
    while (current) {
      const value = current.data['nav'] as NavKey | undefined;
      if (value) nav = value;
      current = current.firstChild;
    }
    return nav;
  }
}
