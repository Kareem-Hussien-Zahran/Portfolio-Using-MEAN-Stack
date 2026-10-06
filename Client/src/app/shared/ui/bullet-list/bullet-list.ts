import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-bullet-list',
  templateUrl: './bullet-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class BulletList {
  readonly items = input<readonly string[]>([]);
}
