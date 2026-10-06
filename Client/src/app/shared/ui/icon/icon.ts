import { Component, ChangeDetectionStrategy, input } from '@angular/core';

export type IconName = 'github' | 'demo' | 'details' | 'arrow';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class Icon {
  readonly name = input.required<IconName>();
}
