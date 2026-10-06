import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Project } from '@core/models/project.model';
import { Breadcrumb } from '@shared/ui/breadcrumb/breadcrumb';
import { CaseMeta } from '@features/project-detail/case-meta/case-meta';

@Component({
  selector: 'app-case-hero',
  imports: [RouterLink, Breadcrumb, CaseMeta],
  templateUrl: './case-hero.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class CaseHero {
  readonly project = input.required<Project>();
}
