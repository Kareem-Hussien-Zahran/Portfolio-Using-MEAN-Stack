import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageSection } from '@shared/ui/page-section/page-section';
import { TagList } from '@shared/ui/tag-list/tag-list';

@Component({
  selector: 'app-toolkit-case-study-section',
  imports: [RouterLink, PageSection, TagList],
  templateUrl: './toolkit-case-study-section.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class ToolkitCaseStudySection {
  readonly toolkitTitle = input.required<string>();
  readonly tools = input.required<readonly string[]>();
  readonly caseTitle = input.required<string>();
  readonly caseText = input.required<string>();
  readonly caseSlug = input.required<string>();
}
