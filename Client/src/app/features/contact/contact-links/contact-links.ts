import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { ProfileService } from '@core/services/profile.service';
import { ContactLink } from '@features/contact/contact-link/contact-link';

@Component({
  selector: 'app-contact-links',
  imports: [ContactLink],
  templateUrl: './contact-links.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class ContactLinks {
  private readonly profile = inject(ProfileService).profile;

  protected readonly links = computed(() => {
    const p = this.profile();
    return [
      { icon: '✉', title: 'Email', subtitle: p.email, href: `mailto:${p.email}` },
      { icon: 'in', title: 'LinkedIn', subtitle: 'Professional profile', href: p.linkedin },
      { icon: '◉', title: 'GitHub', subtitle: 'Code & repositories', href: p.github },
      { icon: 'CV', title: 'Resume', subtitle: 'View professional profile', href: p.resume },
    ];
  });
}
