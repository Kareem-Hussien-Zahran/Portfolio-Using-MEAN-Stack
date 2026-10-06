import { Component, ChangeDetectionStrategy } from '@angular/core';
import { InfoItem } from '@core/models/content.model';
import { PageSection } from '@shared/ui/page-section/page-section';
import { FeatureCard } from '@shared/ui/feature-card/feature-card';

@Component({
  selector: 'app-ai-pillars-section',
  imports: [PageSection, FeatureCard],
  templateUrl: './ai-pillars-section.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class AiPillarsSection {
  protected readonly pillars: InfoItem[] = [
    { number: "01 / LLM ENGINEERING", title: "LLM Applications", description: "Prompting, model interaction, API integration, structured outputs, and application-level orchestration." },
    { number: "02 / RAG ENGINEERING", title: "Retrieval-Augmented Generation", description: "Connect language models to external knowledge through retrieval, embeddings, vector stores, context construction, and grounded generation." },
    { number: "03 / AGENT ENGINEERING", title: "AI Agents", description: "Design agents that can reason through tasks, select tools, retrieve information, call APIs, and participate in business workflows." },
    { number: "04 / ENTERPRISE AI", title: "Intelligent Applications", description: "Combine software architecture, databases, APIs, AI models, and workflow automation to build enterprise-oriented systems." },
  ];
}
