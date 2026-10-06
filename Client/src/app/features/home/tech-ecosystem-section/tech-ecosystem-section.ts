import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PageSection } from '@shared/ui/page-section/page-section';
import { SectionHead } from '@shared/ui/section-head/section-head';
import { TagList } from '@shared/ui/tag-list/tag-list';

@Component({
  selector: 'app-tech-ecosystem-section',
  imports: [PageSection, SectionHead, TagList],
  templateUrl: './tech-ecosystem-section.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class TechEcosystemSection {
  protected readonly tech = [
    "C# / .NET", "Node.js", "Express", "Angular", "MongoDB", "REST APIs", "SQL", "Python",
    "Pandas", "NumPy", "Power BI", "LLMs", "RAG", "Agents", "Agentic AI", "Embeddings", "Tool Calling",
  ];
}
