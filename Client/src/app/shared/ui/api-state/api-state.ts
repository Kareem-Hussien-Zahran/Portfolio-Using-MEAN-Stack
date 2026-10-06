import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';

@Component({
  selector: 'app-api-state',
  templateUrl: './api-state.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class ApiState {
  readonly loading = input(false);
  readonly failed = input(false);
  readonly retry = output<void>();
}
