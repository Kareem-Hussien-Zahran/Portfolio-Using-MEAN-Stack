import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-admin-page-header',
  templateUrl: './admin-page-header.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class AdminPageHeader {
  readonly title = input.required<string>();
  readonly subtitle = input('');
}
