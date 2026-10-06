import { Component, ChangeDetectionStrategy } from '@angular/core';
import { InfoItem } from '@core/models/content.model';
import { PageSection } from '@shared/ui/page-section/page-section';
import { Timeline } from '@shared/ui/timeline/timeline';

@Component({
  selector: 'app-about-intro-section',
  imports: [PageSection, Timeline],
  templateUrl: './about-intro-section.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class AboutIntroSection {
  protected readonly philosophy: InfoItem[] = [
    { title: "Understand", description: "Translate business and user needs into clear requirements." },
    { title: "Engineer", description: "Design the architecture, data model, APIs, backend, and application behavior." },
    { title: "Intelligence", description: "Add ML, LLMs, RAG, agents, and automation where they solve a real system need." },
  ];
}
