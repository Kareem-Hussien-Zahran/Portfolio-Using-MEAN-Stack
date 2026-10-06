import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ProfileService } from '@core/services/profile.service';

@Component({
  selector: 'app-site-footer',
  templateUrl: './site-footer.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class SiteFooter {
  protected readonly profile = inject(ProfileService).profile;
  protected readonly year = new Date().getFullYear();
}
