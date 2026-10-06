import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ArchNode } from '@core/models/content.model';
import { PageSection } from '@shared/ui/page-section/page-section';
import { ArchitectureDiagram } from '@shared/ui/architecture-diagram/architecture-diagram';

@Component({
  selector: 'app-system-pattern-section',
  imports: [PageSection, ArchitectureDiagram],
  templateUrl: './system-pattern-section.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class SystemPatternSection {
  protected readonly nodes: ArchNode[] = [
    { label: "Users & Business Roles" },
    { label: "Enterprise Application / API" },
    { label: "Database + Business Data" },
    { label: "AI Orchestration + LLM / RAG / Agent", ai: true },
    { label: "Tools / Actions / Workflow" },
  ];
}
