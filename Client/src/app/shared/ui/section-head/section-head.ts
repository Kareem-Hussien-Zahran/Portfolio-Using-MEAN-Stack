import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-section-head',
  templateUrl: './section-head.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class SectionHead {
  readonly eyebrow = input.required<string>();
  readonly title = input.required<string>();
}
