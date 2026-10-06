import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { valueOr } from '@core/utils/resource';
import { ProjectsApi } from '@core/api/projects.api';
import { Project } from '@core/models/project.model';
import { ToastService } from '@core/services/toast.service';
import { ConfirmService } from '@core/services/confirm.service';
import { serverMessage } from '@core/utils/http-error';
import { AdminPageHeader } from '@features/dashboard/admin-page-header/admin-page-header';
import { ApiState } from '@shared/ui/api-state/api-state';

@Component({
  selector: 'app-projects-admin',
  imports: [RouterLink, AdminPageHeader, ApiState],
  templateUrl: './projects-admin.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class ProjectsAdmin {
  private readonly api = inject(ProjectsApi);
  private readonly toast = inject(ToastService);
  private readonly confirm = inject(ConfirmService);

  protected readonly projects = rxResource({ stream: () => this.api.list() });
  protected readonly query = signal('');
  protected readonly all = computed(() => valueOr(this.projects, []));
  protected readonly visible = computed(() => {
    const q = this.query().trim().toLowerCase();
    return this.all().filter((p) => !q || [p.title, p.category, p.id].some((v) => v.toLowerCase().includes(q)));
  });

  protected toggleFeatured(p: Project): void {
    this.api.update(p.id, { featured: !p.featured }).subscribe({
      next: () => {
        this.toast.success(p.featured ? `"${p.title}" is no longer featured` : `"${p.title}" is now featured`);
        this.projects.reload();
      },
      error: (err) => this.toast.error(serverMessage(err, 'Could not update the project')),
    });
  }

  protected async remove(p: Project): Promise<void> {
    if (!(await this.confirm.ask(`Delete "${p.title}"? This cannot be undone.`))) return;
    this.api.remove(p.id).subscribe({
      next: () => {
        this.toast.success(`Deleted "${p.title}"`);
        this.projects.reload();
      },
      error: (err) => this.toast.error(serverMessage(err, 'Could not delete the project')),
    });
  }
}
