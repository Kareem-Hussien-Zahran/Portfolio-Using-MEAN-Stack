import { Component, ChangeDetectionStrategy, output } from '@angular/core';

@Component({
  selector: 'app-menu-toggle',
  templateUrl: './menu-toggle.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class MenuToggle {
  readonly toggled = output<void>();
}
