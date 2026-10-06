import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-flow-step',
  templateUrl: './flow-step.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class FlowStep {
  readonly step = input.required<string>();
  readonly title = input.required<string>();
  readonly description = input.required<string>();
}
