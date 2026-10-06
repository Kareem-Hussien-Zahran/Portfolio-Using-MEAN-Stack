import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ThemeService } from '@core/services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class ThemeToggle {
  protected readonly theme = inject(ThemeService);
}
