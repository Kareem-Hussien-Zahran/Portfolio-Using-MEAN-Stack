import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';

@Component({
  selector: 'app-project-filters',
  templateUrl: './project-filters.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class ProjectFilters {
  readonly filters = input.required<readonly string[]>();
  readonly active = input.required<string>();
  readonly count = input.required<number>();
  readonly selected = output<string>();
}
