import { Component, ChangeDetectionStrategy } from '@angular/core';
import { InfoItem } from '@core/models/content.model';
import { PageSection } from '@shared/ui/page-section/page-section';
import { SectionHead } from '@shared/ui/section-head/section-head';
import { FeatureCard } from '@shared/ui/feature-card/feature-card';

@Component({
  selector: 'app-agentic-showcase-section',
  imports: [PageSection, SectionHead, FeatureCard],
  templateUrl: './agentic-showcase-section.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class AgenticShowcaseSection {
  protected readonly agents: InfoItem[] = [
    { title: "CRM Agent", description: "Customer-data retrieval, summaries, actions, and workflow assistance." },
    { title: "ERP Agent", description: "Business-system interaction across structured enterprise data and operations." },
    { title: "Database Agent", description: "Natural-language interaction with databases through controlled tools and queries." },
    { title: "Data Analysis Agent", description: "Turn questions into analytical workflows over structured datasets." },
    { title: "Sales & Marketing Agent", description: "Assist with business intelligence, content workflows, and sales-oriented tasks." },
  ];
}
