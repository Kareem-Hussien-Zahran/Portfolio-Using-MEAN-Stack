import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, OnDestroy, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';

/**
 * On inner pages (`body.fit-page`) the whole <main> is scaled down so the page fits in a single
 * viewport. On the home page the scale is reset. Replaces `fitViewportPage()` from the old site.js.
 */
@Directive({ selector: '[appFitViewport]' })
export class FitViewport implements OnInit, OnDestroy {
  private readonly main: HTMLElement = inject(ElementRef).nativeElement;
  private readonly doc = inject(DOCUMENT);
  private readonly win = this.doc.defaultView!;
  private readonly router = inject(Router);

  private observer?: MutationObserver;
  private navSub?: Subscription;
  private raf = 0;
  private readonly onResize = () => this.schedule();

  ngOnInit(): void {
    this.win.addEventListener('resize', this.onResize);
    this.observer = new MutationObserver((records) => {
      if (records.some((r) => r.type === 'childList' || r.attributeName === 'class')) this.schedule();
    });
    this.observer.observe(this.main, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['class'],
    });
    this.navSub = this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => setTimeout(() => this.schedule(), 50));
    setTimeout(() => this.schedule(), 50);
  }

  ngOnDestroy(): void {
    this.win.removeEventListener('resize', this.onResize);
    this.observer?.disconnect();
    this.navSub?.unsubscribe();
    this.win.cancelAnimationFrame(this.raf);
  }

  private schedule(): void {
    this.win.cancelAnimationFrame(this.raf);
    this.raf = this.win.requestAnimationFrame(() => this.fit());
  }

  private fit(): void {
    const main = this.main;
    if (!this.doc.body.classList.contains('fit-page')) {
      main.style.removeProperty('transform');
      main.style.removeProperty('height');
      main.style.removeProperty('--page-fit-scale');
      return;
    }
    const header = this.doc.querySelector<HTMLElement>('.site-header');
    main.style.transform = 'none';
    main.style.height = 'auto';
    const available = Math.max(1, this.win.innerHeight - (header?.offsetHeight ?? 0) - 4);
    const natural = Math.max(1, main.scrollHeight);
    const scale = Math.min(1, available / natural);
    main.style.setProperty('--page-fit-scale', scale.toFixed(4));
    main.style.transform = 'scale(var(--page-fit-scale))';
    main.style.height = `${Math.ceil(natural * scale)}px`;
  }
}
