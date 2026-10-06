import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageHero } from '@shared/ui/page-hero/page-hero';
import { PageSection } from '@shared/ui/page-section/page-section';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink, PageHero, PageSection],
  templateUrl: './not-found.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class NotFound {}
