import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { InfoItem } from '@core/models/content.model';
import { FlowStep } from '@shared/ui/flow-step/flow-step';

@Component({
  selector: 'app-process-flow',
  imports: [FlowStep],
  templateUrl: './process-flow.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class ProcessFlow {
  readonly items = input.required<readonly InfoItem[]>();
}
