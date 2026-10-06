import { Component, ChangeDetectionStrategy } from '@angular/core';
import { InfoItem } from '@core/models/content.model';
import { PageSection } from '@shared/ui/page-section/page-section';
import { FeatureCard } from '@shared/ui/feature-card/feature-card';

@Component({
  selector: 'app-enterprise-systems-section',
  imports: [PageSection, FeatureCard],
  templateUrl: './enterprise-systems-section.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class EnterpriseSystemsSection {
  protected readonly systems: InfoItem[] = [
    { number: "01", title: "Intelligent CRM", description: "Customer context, retrieval, summaries, recommendations, and controlled actions." },
    { number: "02", title: "Intelligent ERP", description: "AI-assisted operations over structured business entities and workflows." },
    { number: "03", title: "Intelligent Analytics", description: "Natural-language access to analytical information and data workflows." },
    { number: "04", title: "Intelligent Sales", description: "Assist sales workflows with customer intelligence, retrieval, and automation." },
    { number: "05", title: "Intelligent Marketing", description: "Connect language intelligence with marketing processes and business context." },
  ];
}
