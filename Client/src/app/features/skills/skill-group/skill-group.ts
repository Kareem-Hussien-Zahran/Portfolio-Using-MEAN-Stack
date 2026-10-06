import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { SkillGroupDto } from '@core/models/skill-group.model';

@Component({
  selector: 'app-skill-group',
  templateUrl: './skill-group.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class SkillGroup {
  readonly group = input.required<SkillGroupDto>();
  readonly number = input.required<string>();

  protected initials(skill: string): string {
    return skill.replace(/[^A-Za-z0-9]/g, '').slice(0, 2).toUpperCase() || 'AI';
  }
}
