import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ArchNode } from '@core/models/content.model';
import { PageSection } from '@shared/ui/page-section/page-section';
import { ArchitectureDiagram } from '@shared/ui/architecture-diagram/architecture-diagram';

@Component({
  selector: 'app-flagship-architecture-section',
  imports: [PageSection, ArchitectureDiagram],
  templateUrl: './flagship-architecture-section.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class FlagshipArchitectureSection {
  protected readonly nodes: ArchNode[] = [
    { label: "Business / User Requirements" },
    { label: "Application & API Layer" },
    { label: "Data & Enterprise Systems" },
    { label: "LLM / RAG / Agents / Tools", ai: true },
    { label: "Workflow Execution & Integration" },
  ];
}
