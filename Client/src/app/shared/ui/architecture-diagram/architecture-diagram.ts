import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { ArchNode } from '@core/models/content.model';

@Component({
  selector: 'app-architecture-diagram',
  imports: [NgTemplateOutlet],
  templateUrl: './architecture-diagram.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class ArchitectureDiagram {
  readonly nodes = input.required<readonly ArchNode[]>();
  /** `diagram` = plain `.arch-diagram`, `flow` = framed `.architecture-card`. */
  readonly variant = input<'diagram' | 'flow'>('diagram');
  /** Prefix each node with its 01, 02, … index. */
  readonly numbered = input(false);
  readonly marginTop = input(0);

  protected pad(n: number): string {
    return String(n).padStart(2, '0');
  }
}
