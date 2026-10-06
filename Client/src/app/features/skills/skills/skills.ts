import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { SkillsApi } from '@core/api/skills.api';
import { valueOr } from '@core/utils/resource';
import { PageHero } from '@shared/ui/page-hero/page-hero';
import { PageSection } from '@shared/ui/page-section/page-section';
import { ApiState } from '@shared/ui/api-state/api-state';
import { SkillGroup } from '@features/skills/skill-group/skill-group';

@Component({
  selector: 'app-skills',
  imports: [PageHero, PageSection, ApiState, SkillGroup],
  templateUrl: './skills.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class Skills {
  private readonly api = inject(SkillsApi);
  protected readonly skills = rxResource({ stream: () => this.api.list() });
  protected readonly groups = computed(() => valueOr(this.skills, []));

  protected pad(n: number): string {
    return String(n).padStart(2, '0');
  }
}
