import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ExperienceApi } from '@core/api/experience.api';
import { valueOr } from '@core/utils/resource';
import { InfoItem } from '@core/models/content.model';
import { ApiState } from '@shared/ui/api-state/api-state';
import { Timeline } from '@shared/ui/timeline/timeline';

@Component({
  selector: 'app-experience-timeline-card',
  imports: [ApiState, Timeline],
  templateUrl: './experience-timeline-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class ExperienceTimelineCard {
  private readonly api = inject(ExperienceApi);
  protected readonly experience = rxResource({ stream: () => this.api.list() });

  protected readonly items = computed<InfoItem[]>(() =>
    valueOr(this.experience, []).map((e) => ({
      title: e.title,
      meta: `${e.org} · ${e.period}`,
      description: e.description,
    })),
  );
}
