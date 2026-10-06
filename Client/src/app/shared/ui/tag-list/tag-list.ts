import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class TagList {
  readonly items = input.required<readonly string[]>();
  /** Use the larger `.skill-cloud` layout instead of the compact `.tags` row. */
  readonly cloud = input(false);
}
