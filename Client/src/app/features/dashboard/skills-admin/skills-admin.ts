import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { valueOr } from '@core/utils/resource';
import { SkillsApi } from '@core/api/skills.api';
import { SkillGroupDto } from '@core/models/skill-group.model';
import { ToastService } from '@core/services/toast.service';
import { ConfirmService } from '@core/services/confirm.service';
import { serverMessage } from '@core/utils/http-error';
import { AdminPageHeader } from '@features/dashboard/admin-page-header/admin-page-header';
import { ApiState } from '@shared/ui/api-state/api-state';
import { TagList } from '@shared/ui/tag-list/tag-list';
import { ModalDialog } from '@features/dashboard/modal-dialog/modal-dialog';
import { SkillForm } from '@features/dashboard/skill-form/skill-form';

@Component({
  selector: 'app-skills-admin',
  imports: [AdminPageHeader, ApiState, TagList, ModalDialog, SkillForm],
  templateUrl: './skills-admin.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class SkillsAdmin {
  private readonly api = inject(SkillsApi);
  private readonly toast = inject(ToastService);
  private readonly confirm = inject(ConfirmService);

  protected readonly skills = rxResource({ stream: () => this.api.list() });
  protected readonly groups = computed(() => valueOr(this.skills, []));
  protected readonly editing = signal<SkillGroupDto | 'new' | null>(null);

  protected onSaved(): void {
    this.editing.set(null);
    this.skills.reload();
  }

  protected async remove(g: SkillGroupDto): Promise<void> {
    if (!(await this.confirm.ask(`Delete the "${g.group}" skill group?`))) return;
    this.api.remove(g._id).subscribe({
      next: () => {
        this.toast.success(`Deleted "${g.group}"`);
        this.skills.reload();
      },
      error: (err) => this.toast.error(serverMessage(err, 'Could not delete the skill group')),
    });
  }
}
