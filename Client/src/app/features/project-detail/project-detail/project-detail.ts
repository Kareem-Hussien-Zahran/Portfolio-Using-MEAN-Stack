import { Component, ChangeDetectionStrategy, input, inject, computed, effect } from '@angular/core';
import { RouterLink } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { ProjectsApi } from '@core/api/projects.api';
import { isNotFound } from '@core/utils/http-error';
import { valueOr } from '@core/utils/resource';
import { ArchNode } from '@core/models/content.model';
import { ApiState } from '@shared/ui/api-state/api-state';
import { CaseHero } from '@features/project-detail/case-hero/case-hero';
import { CaseToc } from '@features/project-detail/case-toc/case-toc';
import { CaseSection } from '@features/project-detail/case-section/case-section';
import { BulletList } from '@shared/ui/bullet-list/bullet-list';
import { ArchitectureDiagram } from '@shared/ui/architecture-diagram/architecture-diagram';
import { TagList } from '@shared/ui/tag-list/tag-list';
import { PageHero } from '@shared/ui/page-hero/page-hero';
import { PageSection } from '@shared/ui/page-section/page-section';

@Component({
  selector: 'app-project-detail',
  imports: [RouterLink, ApiState, CaseHero, CaseToc, CaseSection, BulletList, ArchitectureDiagram, TagList, PageHero, PageSection],
  templateUrl: './project-detail.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class ProjectDetail {
  /** Bound from the `:slug` route parameter (withComponentInputBinding) – the project's `id`. */
  readonly slug = input.required<string>();

  private readonly api = inject(ProjectsApi);
  protected readonly project = rxResource({
    params: () => this.slug(),
    stream: ({ params }) => this.api.getById(params),
  });

  protected readonly current = computed(() => valueOr(this.project, undefined));
  protected readonly notFound = computed(() => isNotFound(this.project.error()));
  /** Real failures (network / 5xx) offer a retry; a 404 shows the "not found" page instead. */
  protected readonly failed = computed(() => !!this.project.error() && !this.notFound());
  protected readonly archNodes = computed<ArchNode[]>(() =>
    (this.current()?.architecture ?? []).map((label) => ({ label })),
  );

  constructor() {
    const title = inject(Title);
    effect(() => {
      const p = this.current();
      title.setTitle(p ? `${p.title} — Case Study` : 'Case Study — Kareem Hussien');
    });
  }
}
