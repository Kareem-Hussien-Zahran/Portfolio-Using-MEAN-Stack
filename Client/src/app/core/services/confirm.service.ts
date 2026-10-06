import { Injectable, signal } from '@angular/core';

export interface ConfirmState {
  message: string;
  confirmLabel: string;
}

/** Promise-based replacement for window.confirm, rendered by <app-confirm-host>. */
@Injectable({ providedIn: 'root' })
export class ConfirmService {
  readonly state = signal<ConfirmState | null>(null);
  private resolver: ((value: boolean) => void) | null = null;

  ask(message: string, confirmLabel = 'Delete'): Promise<boolean> {
    this.resolver?.(false);
    this.state.set({ message, confirmLabel });
    return new Promise<boolean>((resolve) => (this.resolver = resolve));
  }

  resolve(value: boolean): void {
    if (!this.resolver) return;
    this.resolver(value);
    this.resolver = null;
    this.state.set(null);
  }
}
