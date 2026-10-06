import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PageHero } from '@shared/ui/page-hero/page-hero';
import { MlPipelineSection } from '@features/machine-learning/ml-pipeline-section/ml-pipeline-section';
import { ToolkitCaseStudySection } from '@shared/ui/toolkit-case-study-section/toolkit-case-study-section';

@Component({
  selector: 'app-machine-learning',
  imports: [PageHero, MlPipelineSection, ToolkitCaseStudySection],
  templateUrl: './machine-learning.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class MachineLearning {
  protected readonly stack = [
    "Python", "Scikit-learn", "CatBoost", "LightGBM", "Pandas", "NumPy",
    "Preprocessing", "Feature Engineering", "Evaluation",
  ];
}
