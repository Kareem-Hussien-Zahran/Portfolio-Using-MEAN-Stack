import { Component, ChangeDetectionStrategy } from '@angular/core';
import { InfoItem } from '@core/models/content.model';
import { PageSection } from '@shared/ui/page-section/page-section';
import { FeatureCard } from '@shared/ui/feature-card/feature-card';

@Component({
  selector: 'app-data-pillars-section',
  imports: [PageSection, FeatureCard],
  templateUrl: './data-pillars-section.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class DataPillarsSection {
  protected readonly pillars: InfoItem[] = [
    { number: "01", title: "Data Preparation", description: "Cleaning, transformation, ETL thinking, and analysis-ready datasets." },
    { number: "02", title: "Analysis", description: "Use Python, SQL, and analytical methods to explore business questions." },
    { number: "03", title: "BI & Reporting", description: "Build models, measures, dashboards, and reports that communicate insights." },
  ];
}
