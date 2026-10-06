import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class Notice {}
