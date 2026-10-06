import { Component, ChangeDetectionStrategy } from '@angular/core';
import { InfoItem } from '@core/models/content.model';
import { PageSection } from '@shared/ui/page-section/page-section';
import { FeatureCard } from '@shared/ui/feature-card/feature-card';

@Component({
  selector: 'app-technical-journey-section',
  imports: [PageSection, FeatureCard],
  templateUrl: './technical-journey-section.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class TechnicalJourneySection {
  protected readonly journey: InfoItem[] = [
    { number: "01", title: "Software Engineering", description: "OOP, backend development, APIs, databases, enterprise application patterns." },
    { number: "02", title: "Data & ML", description: "Data preparation, analysis, feature engineering, model training and evaluation." },
    { number: "03", title: "Generative & Agentic AI", description: "LLMs, RAG, agents, tool calling, memory, workflows, and AI-powered applications." },
  ];
}
