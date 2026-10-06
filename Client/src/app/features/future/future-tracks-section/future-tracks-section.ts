import { Component, ChangeDetectionStrategy } from '@angular/core';
import { InfoItem } from '@core/models/content.model';
import { PageSection } from '@shared/ui/page-section/page-section';
import { FeatureCard } from '@shared/ui/feature-card/feature-card';

@Component({
  selector: 'app-future-tracks-section',
  imports: [PageSection, FeatureCard],
  templateUrl: './future-tracks-section.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class FutureTracksSection {
  private readonly soon = "Coming soon — future implementations and case studies will be added here.";

  protected readonly tracks: InfoItem[] = [
    { number: "01", title: "Deep Learning", description: this.soon },
    { number: "02", title: "Natural Language Processing", description: this.soon },
    { number: "03", title: "Computer Vision", description: this.soon },
  ];
}
