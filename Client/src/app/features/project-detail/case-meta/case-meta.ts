import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { Project } from '@core/models/project.model';

@Component({
  selector: 'app-case-meta',
  templateUrl: './case-meta.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class CaseMeta {
  readonly project = input.required<Project>();
}
