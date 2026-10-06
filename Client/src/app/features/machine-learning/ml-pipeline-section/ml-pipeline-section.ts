import { Component, ChangeDetectionStrategy } from '@angular/core';
import { InfoItem } from '@core/models/content.model';
import { PageSection } from '@shared/ui/page-section/page-section';
import { ProcessFlow } from '@shared/ui/process-flow/process-flow';

@Component({
  selector: 'app-ml-pipeline-section',
  imports: [PageSection, ProcessFlow],
  templateUrl: './ml-pipeline-section.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class MlPipelineSection {
  protected readonly steps: InfoItem[] = [
    { number: "01", title: "Data", description: "Understand and prepare the dataset." },
    { number: "02", title: "Preprocess", description: "Clean, transform, and prepare features." },
    { number: "03", title: "Train", description: "Train appropriate supervised or unsupervised models." },
    { number: "04", title: "Evaluate", description: "Measure model behavior with relevant evaluation methods." },
    { number: "05", title: "Integrate", description: "Connect the model to a usable application workflow." },
  ];
}
