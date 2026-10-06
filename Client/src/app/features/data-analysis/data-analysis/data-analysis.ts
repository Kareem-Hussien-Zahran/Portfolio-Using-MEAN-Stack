import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PageHero } from '@shared/ui/page-hero/page-hero';
import { DataPillarsSection } from '@features/data-analysis/data-pillars-section/data-pillars-section';
import { ToolkitCaseStudySection } from '@shared/ui/toolkit-case-study-section/toolkit-case-study-section';

@Component({
  selector: 'app-data-analysis',
  imports: [PageHero, DataPillarsSection, ToolkitCaseStudySection],
  templateUrl: './data-analysis.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class DataAnalysis {
  protected readonly toolkit = [
    "Power BI", "Excel", "SQL", "Python", "Pandas", "NumPy", "Power Query", "Power Pivot", "DAX", "Tableau",
  ];
}
