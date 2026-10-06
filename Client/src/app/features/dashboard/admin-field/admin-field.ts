import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-admin-field',
  templateUrl: './admin-field.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class AdminField {
  readonly label = input.required<string>();
  readonly controlId = input('');
  readonly hint = input('');
  readonly error = input('');
  readonly required = input(false);
}
