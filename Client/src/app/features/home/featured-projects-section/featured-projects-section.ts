import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProjectsApi } from '@core/api/projects.api';
import { valueOr } from '@core/utils/resource';
import { PageSection } from '@shared/ui/page-section/page-section';
import { SectionHead } from '@shared/ui/section-head/section-head';
import { ApiState } from '@shared/ui/api-state/api-state';
import { ProjectCard } from '@features/projects/project-card/project-card';

@Component({
  selector: 'app-featured-projects-section',
  imports: [RouterLink, PageSection, SectionHead, ApiState, ProjectCard],
  templateUrl: './featured-projects-section.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class FeaturedProjectsSection {
  private readonly api = inject(ProjectsApi);
  protected readonly featured = rxResource({ stream: () => this.api.list({ featured: true }) });
  protected readonly items = computed(() => valueOr(this.featured, []));
}
