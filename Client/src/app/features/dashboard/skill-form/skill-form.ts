import { Component, ChangeDetectionStrategy, input, output, inject, signal, effect } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SkillsApi } from '@core/api/skills.api';
import { SkillGroupDto } from '@core/models/skill-group.model';
import { ToastService } from '@core/services/toast.service';
import { serverMessage } from '@core/utils/http-error';
import { AdminField } from '@features/dashboard/admin-field/admin-field';
import { StringListField } from '@features/dashboard/string-list-field/string-list-field';

@Component({
  selector: 'app-skill-form',
  imports: [ReactiveFormsModule, AdminField, StringListField],
  templateUrl: './skill-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class SkillForm {
  /** The group to edit, or `null` to create a new one. */
  readonly skill = input<SkillGroupDto | null>(null);
  readonly saved = output<void>();
  readonly cancelled = output<void>();

  private readonly api = inject(SkillsApi);
  private readonly toast = inject(ToastService);

  protected readonly saving = signal(false);
  protected readonly error = signal('');
  protected readonly form = inject(NonNullableFormBuilder).group({
    group: ['', Validators.required],
    items: [[] as string[]],
  });

  constructor() {
    effect(() => {
      const s = this.skill();
      this.form.reset({ group: s?.group ?? '', items: s?.items ?? [] });
    });
  }

  protected submit(): void {
    this.error.set('');
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.error.set('Group name is required');
      return;
    }
    const value = this.form.getRawValue();
    const current = this.skill();
    this.saving.set(true);
    (current ? this.api.update(current._id, value) : this.api.create(value)).subscribe({
      next: (g) => {
        this.toast.success(current ? `Saved "${g.group}"` : `Created "${g.group}"`);
        this.saving.set(false);
        this.saved.emit();
      },
      error: (err) => {
        this.saving.set(false);
        this.error.set(serverMessage(err, 'Could not save the skill group'));
      },
    });
  }
}
