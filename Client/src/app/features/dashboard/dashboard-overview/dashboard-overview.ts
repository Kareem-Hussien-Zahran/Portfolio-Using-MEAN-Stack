import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { valueOr } from '@core/utils/resource';
import { DatePipe } from '@angular/common';
import { ProjectsApi } from '@core/api/projects.api';
import { SkillsApi } from '@core/api/skills.api';
import { ExperienceApi } from '@core/api/experience.api';
import { ContactApi } from '@core/api/contact.api';
import { AdminPageHeader } from '@features/dashboard/admin-page-header/admin-page-header';
import { StatCard } from '@features/dashboard/stat-card/stat-card';

@Component({
  selector: 'app-dashboard-overview',
  imports: [RouterLink, DatePipe, AdminPageHeader, StatCard],
  templateUrl: './dashboard-overview.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class DashboardOverview {
  private readonly projectsApi = inject(ProjectsApi);
  private readonly skillsApi = inject(SkillsApi);
  private readonly experienceApi = inject(ExperienceApi);
  private readonly contactApi = inject(ContactApi);

  private readonly projectsRes = rxResource({ stream: () => this.projectsApi.list() });
  private readonly skillsRes = rxResource({ stream: () => this.skillsApi.list() });
  private readonly experienceRes = rxResource({ stream: () => this.experienceApi.list() });
  private readonly inboxRes = rxResource({ stream: () => this.contactApi.inbox() });

  protected readonly projects = computed(() => valueOr(this.projectsRes, []));
  protected readonly skills = computed(() => valueOr(this.skillsRes, []));
  protected readonly experience = computed(() => valueOr(this.experienceRes, []));
  protected readonly inbox = computed(() => valueOr(this.inboxRes, []));

  protected readonly featuredCount = computed(() => this.projects().filter((p) => p.featured).length);
  protected readonly skillCount = computed(() => this.skills().reduce((n, g) => n + g.items.length, 0));
  protected readonly unread = computed(() => this.inbox().filter((m) => !m.read).length);
  protected readonly recent = computed(() => this.inbox().slice(0, 5));
}
