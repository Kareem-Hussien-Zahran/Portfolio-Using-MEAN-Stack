import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Project } from '@core/models/project.model';
import { Icon } from '@shared/ui/icon/icon';

@Component({
  selector: 'app-project-actions',
  imports: [RouterLink, Icon],
  templateUrl: './project-actions.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class ProjectActions {
  readonly project = input.required<Project>();
  readonly expanded = input(false);
  readonly toggled = output<void>();
}
