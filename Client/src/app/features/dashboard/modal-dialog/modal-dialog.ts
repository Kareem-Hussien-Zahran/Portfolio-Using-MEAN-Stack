import { Component, ChangeDetectionStrategy, input, output, viewChild, ElementRef, afterNextRender } from '@angular/core';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class ModalDialog {
  readonly title = input.required<string>();
  readonly closed = output<void>();

  private readonly dlg = viewChild.required<ElementRef<HTMLDialogElement>>('dlg');

  constructor() {
    afterNextRender(() => this.dlg().nativeElement.showModal());
  }

  protected close(): void {
    this.dlg().nativeElement.close();
  }

  protected onBackdrop(event: MouseEvent): void {
    if (event.target === this.dlg().nativeElement) this.close();
  }
}
