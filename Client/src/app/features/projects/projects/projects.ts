import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProjectsApi } from '@core/api/projects.api';
import { valueOr } from '@core/utils/resource';
import { PageHero } from '@shared/ui/page-hero/page-hero';
import { PageSection } from '@shared/ui/page-section/page-section';
import { ProjectFilters } from '@features/projects/project-filters/project-filters';
import { ApiState } from '@shared/ui/api-state/api-state';
import { ProjectCard } from '@features/projects/project-card/project-card';

@Component({
  selector: 'app-projects',
  imports: [PageHero, PageSection, ProjectFilters, ApiState, ProjectCard],
  templateUrl: './projects.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class Projects {
  private readonly api = inject(ProjectsApi);
  protected readonly projects = rxResource({ stream: () => this.api.list() });
  private readonly all = computed(() => valueOr(this.projects, []));

  protected readonly active = signal('All');
  /** Filter chips are built from the categories that exist in the data. */
  protected readonly filters = computed(() => [
    'All',
    ...new Set(this.all().map((p) => p.category)),
  ]);
  protected readonly visible = computed(() => {
    const active = this.active();
    return this.all().filter((p) => active === 'All' || p.category === active);
  });
}
