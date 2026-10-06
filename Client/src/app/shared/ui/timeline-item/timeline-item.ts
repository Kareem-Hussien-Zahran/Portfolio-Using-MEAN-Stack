import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-timeline-item',
  templateUrl: './timeline-item.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class TimelineItem {
  readonly title = input.required<string>();
  readonly description = input.required<string>();
  readonly meta = input<string>();
}
