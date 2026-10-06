import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PageHero } from '@shared/ui/page-hero/page-hero';
import { PageSection } from '@shared/ui/page-section/page-section';
import { ContactLinks } from '@features/contact/contact-links/contact-links';
import { ContactForm } from '@features/contact/contact-form/contact-form';

@Component({
  selector: 'app-contact',
  imports: [PageHero, PageSection, ContactLinks, ContactForm],
  templateUrl: './contact.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class Contact {}
