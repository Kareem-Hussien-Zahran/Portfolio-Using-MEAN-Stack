import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { InfoItem } from '@core/models/content.model';
import { TimelineItem } from '@shared/ui/timeline-item/timeline-item';

@Component({
  selector: 'app-timeline',
  imports: [TimelineItem],
  templateUrl: './timeline.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class Timeline {
  readonly items = input.required<readonly InfoItem[]>();
  readonly marginTop = input(0);
}
