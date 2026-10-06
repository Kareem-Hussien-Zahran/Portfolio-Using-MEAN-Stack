import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HomeHero } from '@features/home/home-hero/home-hero';
import { CapabilitiesSection } from '@features/home/capabilities-section/capabilities-section';
import { ApproachSection } from '@features/home/approach-section/approach-section';
import { FeaturedProjectsSection } from '@features/home/featured-projects-section/featured-projects-section';
import { TechEcosystemSection } from '@features/home/tech-ecosystem-section/tech-ecosystem-section';
import { HomeCta } from '@features/home/home-cta/home-cta';

@Component({
  selector: 'app-home',
  imports: [HomeHero, CapabilitiesSection, ApproachSection, FeaturedProjectsSection, TechEcosystemSection, HomeCta],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class Home {}
