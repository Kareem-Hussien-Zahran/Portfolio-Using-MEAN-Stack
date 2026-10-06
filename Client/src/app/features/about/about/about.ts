import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PageHero } from '@shared/ui/page-hero/page-hero';
import { AboutIntroSection } from '@features/about/about-intro-section/about-intro-section';
import { TechnicalJourneySection } from '@features/about/technical-journey-section/technical-journey-section';
import { CurrentFocusSection } from '@features/about/current-focus-section/current-focus-section';

@Component({
  selector: 'app-about',
  imports: [PageHero, AboutIntroSection, TechnicalJourneySection, CurrentFocusSection],
  templateUrl: './about.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class About {}
