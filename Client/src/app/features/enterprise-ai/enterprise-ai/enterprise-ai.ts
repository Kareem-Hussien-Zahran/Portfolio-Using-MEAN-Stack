import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PageHero } from '@shared/ui/page-hero/page-hero';
import { EnterpriseSystemsSection } from '@features/enterprise-ai/enterprise-systems-section/enterprise-systems-section';
import { SystemPatternSection } from '@features/enterprise-ai/system-pattern-section/system-pattern-section';

@Component({
  selector: 'app-enterprise-ai',
  imports: [PageHero, EnterpriseSystemsSection, SystemPatternSection],
  templateUrl: './enterprise-ai.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class EnterpriseAi {}
