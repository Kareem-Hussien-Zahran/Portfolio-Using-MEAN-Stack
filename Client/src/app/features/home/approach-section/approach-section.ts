import { Component, ChangeDetectionStrategy } from '@angular/core';
import { InfoItem } from '@core/models/content.model';
import { PageSection } from '@shared/ui/page-section/page-section';
import { SectionHead } from '@shared/ui/section-head/section-head';
import { ProcessFlow } from '@shared/ui/process-flow/process-flow';

@Component({
  selector: 'app-approach-section',
  imports: [PageSection, SectionHead, ProcessFlow],
  templateUrl: './approach-section.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class ApproachSection {
  protected readonly steps: InfoItem[] = [
    { number: "01", title: "Requirements", description: "Understand the business and user problem." },
    { number: "02", title: "System Design", description: "Define components, data, boundaries, and flows." },
    { number: "03", title: "Build", description: "Implement backend, APIs, databases, and interfaces." },
    { number: "04", title: "Intelligence", description: "Integrate ML, LLMs, RAG, agents, and automation." },
    { number: "05", title: "Integration", description: "Connect the system and prepare it for deployment." },
  ];
}
