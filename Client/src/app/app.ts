import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SiteHeader } from '@layout/site-header/site-header';
import { SiteFooter } from '@layout/site-footer/site-footer';
import { FitViewport } from '@core/directives/fit-viewport';
import { PageMotion } from '@core/directives/page-motion';
import { PageLayoutService } from '@core/services/page-layout.service';
import { ActiveNavService } from '@core/services/active-nav.service';
import { ProfileService } from '@core/services/profile.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SiteHeader, SiteFooter, FitViewport, PageMotion],
  template: `
    @if (!layout.isAdmin()) {
      <app-site-header />
    }
    <main appPageMotion appFitViewport>
      <router-outlet />
    </main>
    @if (!layout.isAdmin()) {
      <app-site-footer />
    }
  `,
})
export class App {
  protected readonly layout = inject(PageLayoutService);

  constructor() {
    this.layout.init();
    inject(ActiveNavService); // start tracking the active nav item
    inject(ProfileService); // fetch GET /api/profile once, shared by footer + contact
  }
}
