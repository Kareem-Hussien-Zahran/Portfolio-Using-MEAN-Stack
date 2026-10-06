import { Component, ChangeDetectionStrategy } from '@angular/core';
import { InfoItem } from '@core/models/content.model';
import { PageSection } from '@shared/ui/page-section/page-section';
import { SectionHead } from '@shared/ui/section-head/section-head';
import { FeatureCard } from '@shared/ui/feature-card/feature-card';

@Component({
  selector: 'app-engineering-capabilities-section',
  imports: [PageSection, SectionHead, FeatureCard],
  templateUrl: './engineering-capabilities-section.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class EngineeringCapabilitiesSection {
  protected readonly capabilities: InfoItem[] = [
    { title: "Backend Architecture", description: "Services, controllers, middleware, validation, business logic, and API boundaries." },
    { title: "Databases", description: "Relational and document data modeling, queries, ORM-based access, and application integration." },
    { title: "Security", description: "Authentication, authorization, policies, validation, and controlled access to application capabilities." },
    { title: "REST APIs", description: "Design application endpoints that expose business capabilities cleanly to other clients and services." },
    { title: "Business Systems", description: "ERP-oriented workflows, CRUD-heavy applications, domain entities, and operational processes." },
    { title: "Integration", description: "Connect software components, data services, AI models, and external APIs into one workflow." },
  ];
}
