import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PageHero } from '@shared/ui/page-hero/page-hero';
import { FutureTracksSection } from '@features/future/future-tracks-section/future-tracks-section';

@Component({
  selector: 'app-future',
  imports: [PageHero, FutureTracksSection],
  templateUrl: './future.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class Future {}
