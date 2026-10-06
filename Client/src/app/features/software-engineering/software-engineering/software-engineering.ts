import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PageHero } from '@shared/ui/page-hero/page-hero';
import { TechStacksSection } from '@features/software-engineering/tech-stacks-section/tech-stacks-section';
import { EngineeringCapabilitiesSection } from '@features/software-engineering/engineering-capabilities-section/engineering-capabilities-section';

@Component({
  selector: 'app-software-engineering',
  imports: [PageHero, TechStacksSection, EngineeringCapabilitiesSection],
  templateUrl: './software-engineering.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class SoftwareEngineering {}
