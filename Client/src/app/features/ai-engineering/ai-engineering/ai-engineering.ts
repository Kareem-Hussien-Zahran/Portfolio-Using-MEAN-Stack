import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PageHero } from '@shared/ui/page-hero/page-hero';
import { AiPillarsSection } from '@features/ai-engineering/ai-pillars-section/ai-pillars-section';
import { AgenticShowcaseSection } from '@features/ai-engineering/agentic-showcase-section/agentic-showcase-section';
import { FlagshipArchitectureSection } from '@features/ai-engineering/flagship-architecture-section/flagship-architecture-section';

@Component({
  selector: 'app-ai-engineering',
  imports: [PageHero, AiPillarsSection, AgenticShowcaseSection, FlagshipArchitectureSection],
  templateUrl: './ai-engineering.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class AiEngineering {}
