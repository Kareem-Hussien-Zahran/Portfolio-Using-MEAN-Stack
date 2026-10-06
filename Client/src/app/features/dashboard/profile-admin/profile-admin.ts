import { Component, ChangeDetectionStrategy, inject, signal, effect } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfileApi } from '@core/api/profile.api';
import { PROFILE } from '@core/data/profile.data';
import { ProfileService } from '@core/services/profile.service';
import { ToastService } from '@core/services/toast.service';
import { serverMessage } from '@core/utils/http-error';
import { AdminPageHeader } from '@features/dashboard/admin-page-header/admin-page-header';
import { AdminField } from '@features/dashboard/admin-field/admin-field';
import { ApiState } from '@shared/ui/api-state/api-state';

@Component({
  selector: 'app-profile-admin',
  imports: [ReactiveFormsModule, AdminPageHeader, AdminField, ApiState],
  templateUrl: './profile-admin.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class ProfileAdmin {
  private readonly api = inject(ProfileApi);
  private readonly toast = inject(ToastService);
  private readonly publicProfile = inject(ProfileService);

  protected readonly profile = rxResource({ stream: () => this.api.get() });
  protected readonly saving = signal(false);
  protected readonly error = signal('');

  protected readonly form = inject(NonNullableFormBuilder).group({
    name: ['', Validators.required],
    role: [''],
    email: [''],
    linkedin: [''],
    github: [''],
    resume: [''],
    summary: [''],
  });

  constructor() {
    effect(() => {
      if (this.profile.hasValue()) this.form.patchValue({ ...PROFILE, ...(this.profile.value() ?? {}) });
    });
  }

  protected submit(): void {
    this.error.set('');
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.error.set('Name is required');
      return;
    }
    this.saving.set(true);
    this.api.update(this.form.getRawValue()).subscribe({
      next: () => {
        this.saving.set(false);
        this.toast.success('Profile saved');
        this.publicProfile.reload();
      },
      error: (err) => {
        this.saving.set(false);
        this.error.set(serverMessage(err, 'Could not save the profile'));
      },
    });
  }
}
