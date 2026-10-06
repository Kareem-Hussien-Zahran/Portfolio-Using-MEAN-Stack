import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PageSection } from '@shared/ui/page-section/page-section';

@Component({
  selector: 'app-current-focus-section',
  imports: [PageSection],
  templateUrl: './current-focus-section.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class CurrentFocusSection {}
