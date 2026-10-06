import { Component, ChangeDetectionStrategy, input, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Project } from '@core/models/project.model';
import { TagList } from '@shared/ui/tag-list/tag-list';
import { ProjectActions } from '@features/projects/project-actions/project-actions';
import { ProjectDetailsPanel } from '@features/projects/project-details-panel/project-details-panel';

@Component({
  selector: 'app-project-card',
  imports: [RouterLink, TagList, ProjectActions, ProjectDetailsPanel],
  templateUrl: './project-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class ProjectCard {
  readonly project = input.required<Project>();

  protected readonly expanded = signal(false);
  protected readonly imageFailed = signal(false);
  /** Cover artwork is a front-end asset named after the project id (not part of the API). */
  protected readonly cover = computed(() => `assets/images/${this.project().id}.svg`);
}
