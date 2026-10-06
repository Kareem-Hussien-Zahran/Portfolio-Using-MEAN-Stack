import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { Breadcrumb } from '@shared/ui/breadcrumb/breadcrumb';

@Component({
  selector: 'app-page-hero',
  imports: [Breadcrumb],
  templateUrl: './page-hero.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class PageHero {
  readonly eyebrow = input.required<string>();
  readonly title = input.required<string>();
  readonly kicker = input.required<string>();
}
