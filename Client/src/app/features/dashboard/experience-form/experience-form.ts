import { Component, ChangeDetectionStrategy, input, output, inject, signal, effect } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExperienceApi } from '@core/api/experience.api';
import { Experience } from '@core/models/experience.model';
import { ToastService } from '@core/services/toast.service';
import { serverMessage } from '@core/utils/http-error';
import { AdminField } from '@features/dashboard/admin-field/admin-field';

@Component({
  selector: 'app-experience-form',
  imports: [ReactiveFormsModule, AdminField],
  templateUrl: './experience-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class ExperienceForm {
  /** The entry to edit, or `null` to create a new one. */
  readonly entry = input<Experience | null>(null);
  readonly saved = output<void>();
  readonly cancelled = output<void>();

  private readonly api = inject(ExperienceApi);
  private readonly toast = inject(ToastService);

  protected readonly saving = signal(false);
  protected readonly error = signal('');
  protected readonly form = inject(NonNullableFormBuilder).group({
    title: ['', Validators.required],
    period: ['', Validators.required],
    org: [''],
    description: [''],
  });

  constructor() {
    effect(() => {
      const e = this.entry();
      this.form.reset({ title: e?.title ?? '', period: e?.period ?? '', org: e?.org ?? '', description: e?.description ?? '' });
    });
  }

  protected submit(): void {
    this.error.set('');
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.error.set('Title and period are required');
      return;
    }
    const value = this.form.getRawValue();
    const current = this.entry();
    this.saving.set(true);
    (current ? this.api.update(current._id!, value) : this.api.create(value)).subscribe({
      next: (e) => {
        this.toast.success(current ? `Saved "${e.title}"` : `Created "${e.title}"`);
        this.saving.set(false);
        this.saved.emit();
      },
      error: (err) => {
        this.saving.set(false);
        this.error.set(serverMessage(err, 'Could not save the entry'));
      },
    });
  }
}
