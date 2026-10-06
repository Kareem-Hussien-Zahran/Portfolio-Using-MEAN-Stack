import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly root = inject(DOCUMENT).documentElement;
  readonly theme = signal<Theme | null>(null);

  constructor() {
    const saved = this.read();
    if (saved) this.apply(saved);
  }

  toggle(): void {
    this.apply(this.root.dataset['theme'] === 'dark' ? 'light' : 'dark');
  }

  private apply(theme: Theme): void {
    this.root.dataset['theme'] = theme;
    this.theme.set(theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* storage unavailable – ignore */
    }
  }

  private read(): Theme | null {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      return v === 'dark' || v === 'light' ? v : null;
    } catch {
      return null;
    }
  }
}
