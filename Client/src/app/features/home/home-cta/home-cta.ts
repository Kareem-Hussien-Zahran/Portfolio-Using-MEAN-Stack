import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageSection } from '@shared/ui/page-section/page-section';

@Component({
  selector: 'app-home-cta',
  imports: [RouterLink, PageSection],
  templateUrl: './home-cta.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class HomeCta {}
