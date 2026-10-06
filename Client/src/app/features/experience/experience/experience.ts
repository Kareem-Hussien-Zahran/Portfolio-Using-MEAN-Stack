import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PageHero } from '@shared/ui/page-hero/page-hero';
import { PageSection } from '@shared/ui/page-section/page-section';
import { ExperienceTimelineCard } from '@features/experience/experience-timeline-card/experience-timeline-card';
import { CertificationsCard } from '@features/experience/certifications-card/certifications-card';

@Component({
  selector: 'app-experience',
  imports: [PageHero, PageSection, ExperienceTimelineCard, CertificationsCard],
  templateUrl: './experience.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class Experience {}
