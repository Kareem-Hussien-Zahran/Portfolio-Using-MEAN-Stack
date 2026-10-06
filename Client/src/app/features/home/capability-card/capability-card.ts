import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-capability-card',
  templateUrl: './capability-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class CapabilityCard {
  readonly number = input.required<string>();
  readonly title = input.required<string>();
  readonly description = input.required<string>();
}
