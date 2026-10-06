import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactApi } from '@core/api/contact.api';
import { serverMessage } from '@core/utils/http-error';

@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule],
  templateUrl: './contact-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class ContactForm {
  private readonly api = inject(ContactApi);
  private readonly fb = inject(NonNullableFormBuilder);

  protected readonly state = signal<'idle' | 'sending' | 'sent' | 'error'>('idle');
  protected readonly feedback = signal('');

  /** The server requires name, email and message; subject is optional. */
  protected readonly form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    subject: [''],
    message: ['', Validators.required],
  });

  protected submit(formEl: HTMLFormElement): void {
    if (this.state() === 'sending') return;
    // Native validation bubbles, like the original static page.
    if (!formEl.checkValidity()) {
      formEl.reportValidity();
      return;
    }
    this.state.set('sending');
    this.api.send(this.form.getRawValue()).subscribe({
      next: (res) => {
        this.feedback.set(res.message === 'Message received' ? 'Thank you — your message was received.' : res.message);
        this.state.set('sent');
        this.form.reset();
      },
      error: (err) => {
        this.feedback.set(serverMessage(err, 'Could not send your message. Please try again.'));
        this.state.set('error');
      },
    });
  }
}
