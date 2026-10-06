import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-stat-card',
  imports: [RouterLink],
  templateUrl: './stat-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class StatCard {
  readonly label = input.required<string>();
  readonly value = input.required<string | number>();
  readonly hint = input('');
  readonly link = input.required<string>();
}
