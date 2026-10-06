import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { Project } from '@core/models/project.model';
import { TagList } from '@shared/ui/tag-list/tag-list';

@Component({
  selector: 'app-project-details-panel',
  imports: [TagList],
  templateUrl: './project-details-panel.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class ProjectDetailsPanel {
  readonly project = input.required<Project>();
}
