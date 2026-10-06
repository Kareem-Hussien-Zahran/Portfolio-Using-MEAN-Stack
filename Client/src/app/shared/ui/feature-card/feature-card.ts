import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-feature-card',
  templateUrl: './feature-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class FeatureCard {
  readonly title = input.required<string>();
  readonly description = input<string>();
  readonly number = input<string>();
  readonly level = input<'h2' | 'h3'>('h3');
  readonly future = input(false);
}
