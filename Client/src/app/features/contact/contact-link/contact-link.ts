import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';

@Component({
  selector: 'app-contact-link',
  templateUrl: './contact-link.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class ContactLink {
  readonly href = input.required<string>();
  readonly icon = input.required<string>();
  readonly title = input.required<string>();
  readonly subtitle = input.required<string>();

  protected readonly external = computed(() => /^https?:/i.test(this.href()));

  /** Placeholder links ("#") must not navigate away from the SPA. */
  protected onClick(event: Event): void {
    if (this.href() === '#') event.preventDefault();
  }
}
