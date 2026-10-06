import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-page-section',
  templateUrl: './page-section.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class PageSection {
  /** Alternate (tinted) section background. */
  readonly alt = input(false);
  /** Extra classes for the inner container, e.g. "grid grid-2". */
  readonly containerClass = input('');
}
