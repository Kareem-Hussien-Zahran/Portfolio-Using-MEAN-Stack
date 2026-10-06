import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-case-toc',
  imports: [RouterLink],
  templateUrl: './case-toc.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class CaseToc {
  protected readonly items = [
    { id: 'problem', label: 'Problem' }, { id: 'requirements', label: 'Requirements' },
    { id: 'solution', label: 'Solution' }, { id: 'architecture', label: 'Architecture' },
    { id: 'engineering', label: 'Engineering' }, { id: 'challenges', label: 'Challenges' },
    { id: 'decisions', label: 'Decisions' }, { id: 'results', label: 'Results' },
    { id: 'technologies', label: 'Technologies' },
  ];
}
