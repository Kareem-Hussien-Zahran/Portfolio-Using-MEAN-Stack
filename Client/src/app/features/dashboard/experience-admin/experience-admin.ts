import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { valueOr } from '@core/utils/resource';
import { ExperienceApi } from '@core/api/experience.api';
import { Experience } from '@core/models/experience.model';
import { ToastService } from '@core/services/toast.service';
import { ConfirmService } from '@core/services/confirm.service';
import { serverMessage } from '@core/utils/http-error';
import { AdminPageHeader } from '@features/dashboard/admin-page-header/admin-page-header';
import { ApiState } from '@shared/ui/api-state/api-state';
import { ModalDialog } from '@features/dashboard/modal-dialog/modal-dialog';
import { ExperienceForm } from '@features/dashboard/experience-form/experience-form';

@Component({
  selector: 'app-experience-admin',
  imports: [AdminPageHeader, ApiState, ModalDialog, ExperienceForm],
  templateUrl: './experience-admin.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class ExperienceAdmin {
  private readonly api = inject(ExperienceApi);
  private readonly toast = inject(ToastService);
  private readonly confirm = inject(ConfirmService);

  protected readonly experience = rxResource({ stream: () => this.api.list() });
  protected readonly items = computed(() => valueOr(this.experience, []));
  protected readonly editing = signal<Experience | 'new' | null>(null);

  protected onSaved(): void {
    this.editing.set(null);
    this.experience.reload();
  }

  protected async remove(e: Experience): Promise<void> {
    if (!(await this.confirm.ask(`Delete "${e.title}"?`))) return;
    this.api.remove(e._id!).subscribe({
      next: () => {
        this.toast.success(`Deleted "${e.title}"`);
        this.experience.reload();
      },
      error: (err) => this.toast.error(serverMessage(err, 'Could not delete the entry')),
    });
  }
}
