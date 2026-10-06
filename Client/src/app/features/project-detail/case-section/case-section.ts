import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-case-section',
  templateUrl: './case-section.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class CaseSection {
  readonly anchor = input.required<string>();
  readonly index = input.required<string>();
  readonly title = input.required<string>();
}
