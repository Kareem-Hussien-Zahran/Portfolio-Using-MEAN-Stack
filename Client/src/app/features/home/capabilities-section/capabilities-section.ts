import { Component, ChangeDetectionStrategy } from '@angular/core';
import { InfoItem } from '@core/models/content.model';
import { PageSection } from '@shared/ui/page-section/page-section';
import { SectionHead } from '@shared/ui/section-head/section-head';
import { CapabilityCard } from '@features/home/capability-card/capability-card';

@Component({
  selector: 'app-capabilities-section',
  imports: [PageSection, SectionHead, CapabilityCard],
  templateUrl: './capabilities-section.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class CapabilitiesSection {
  protected readonly capabilities: InfoItem[] = [
    { number: "01", title: "Intelligent Enterprise Systems", description: "AI-powered CRM, ERP, sales, marketing, analytics, and business applications." },
    { number: "02", title: "LLM Applications", description: "Applications powered by Large Language Models with structured workflows and APIs." },
    { number: "03", title: "RAG Systems", description: "Knowledge-aware systems that retrieve information and generate grounded responses." },
    { number: "04", title: "AI Agents", description: "Agents that reason, use tools, retrieve information, interact with APIs, and execute workflows." },
    { number: "05", title: "AI Automation", description: "AI workflows connecting models with business systems, databases, APIs, and operations." },
    { number: "06", title: "End-to-End ML Systems", description: "Practical pipelines from data preparation and feature engineering to evaluation and application integration." },
  ];
}
