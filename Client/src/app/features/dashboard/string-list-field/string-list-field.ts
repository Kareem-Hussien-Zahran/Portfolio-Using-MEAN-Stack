import { Component, ChangeDetectionStrategy, input, signal, computed, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-string-list-field',
  templateUrl: './string-list-field.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => StringListField), multi: true }],
  host: { style: 'display: contents' },
})
export class StringListField implements ControlValueAccessor {
  readonly controlId = input('');
  readonly placeholder = input('One item per line');
  readonly rows = input(4);

  protected readonly text = signal('');
  protected readonly disabled = signal(false);
  protected readonly count = computed(() => this.parse(this.text()).length);

  private onChange: (value: string[]) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string[] | null): void {
    this.text.set((value ?? []).join('\n'));
  }
  registerOnChange(fn: (value: string[]) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  protected onInput(event: Event): void {
    const value = (event.target as HTMLTextAreaElement).value;
    this.text.set(value);
    this.onChange(this.parse(value));
  }
  protected onBlur(): void {
    this.onTouched();
  }

  private parse(value: string): string[] {
    return value.split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
  }
}
