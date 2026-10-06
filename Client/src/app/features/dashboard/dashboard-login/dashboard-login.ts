import { Component, ChangeDetectionStrategy, input, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@core/services/auth.service';
import { serverMessage } from '@core/utils/http-error';

@Component({
  selector: 'app-dashboard-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './dashboard-login.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class DashboardLogin {
  /** Bound from the `?returnUrl=` query parameter (withComponentInputBinding). */
  readonly returnUrl = input<string>();

  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly busy = signal(false);
  protected readonly error = signal('');
  protected readonly form = inject(NonNullableFormBuilder).group({
    password: ['', Validators.required],
  });

  protected submit(): void {
    if (this.form.invalid || this.busy()) {
      this.error.set('Enter your password');
      return;
    }
    this.busy.set(true);
    this.error.set('');
    this.auth.login(this.form.getRawValue().password).subscribe({
      next: () => void this.router.navigateByUrl(this.returnUrl() || '/admin'),
      error: (err) => {
        this.busy.set(false);
        this.error.set(err?.status === 0 ? 'Cannot reach the server' : serverMessage(err, 'Sign in failed'));
      },
    });
  }
}
