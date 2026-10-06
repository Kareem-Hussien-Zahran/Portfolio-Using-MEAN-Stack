import { Directive, ElementRef, OnDestroy, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';

const TARGETS = '.reveal, .card, .project-card, .timeline-item, .skill-group, .contact-link, .arch-diagram, .list li';

/**
 * Scroll-reveal motion for everything inside the host element.
 * Replaces the old `assets/js/app.js` MutationObserver / IntersectionObserver code and
 * replays the page-enter animation on every route change.
 */
@Directive({ selector: '[appPageMotion]' })
export class PageMotion implements OnInit, OnDestroy {
  private readonly host: HTMLElement = inject(ElementRef).nativeElement;
  private readonly router = inject(Router);

  private mutation?: MutationObserver;
  private intersection?: IntersectionObserver;
  private navSub?: Subscription;
  private readonly seen = new WeakSet<Element>();
  private lastPath = '';

  ngOnInit(): void {
    this.intersection = new IntersectionObserver(
      (entries) =>
        entries.forEach((x) => {
          if (x.isIntersecting) {
            x.target.classList.add('show');
            this.intersection?.unobserve(x.target);
          } else if (!x.target.isConnected) {
            this.intersection?.unobserve(x.target);
          }
        }),
      { threshold: 0.04 },
    );

    this.scan();
    this.mutation = new MutationObserver(() => this.scan());
    this.mutation.observe(this.host, { childList: true, subtree: true });

    this.lastPath = this.router.url.split(/[?#]/)[0];
    this.navSub = this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => {
        const path = e.urlAfterRedirects.split(/[?#]/)[0];
        if (path === this.lastPath) return;
        this.lastPath = path;
        this.replayEnterAnimation();
      });
  }

  ngOnDestroy(): void {
    this.mutation?.disconnect();
    this.intersection?.disconnect();
    this.navSub?.unsubscribe();
  }

  private scan(): void {
    this.host.querySelectorAll<HTMLElement>(TARGETS).forEach((el, i) => {
      if (!el.classList.contains('reveal') && !el.classList.contains('reveal-zoom')) {
        el.classList.add('reveal');
      }
      if (!el.style.getPropertyValue('--delay')) {
        el.style.setProperty('--delay', `${Math.min(i % 8, 7) * 55}ms`);
      }
    });
    this.host.querySelectorAll('.reveal, .reveal-zoom').forEach((el) => {
      if (this.seen.has(el)) return;
      this.seen.add(el);
      this.intersection?.observe(el);
    });
  }

  private replayEnterAnimation(): void {
    this.host.style.animation = 'none';
    void this.host.offsetWidth; // force reflow so the animation restarts
    this.host.style.animation = '';
  }
}
