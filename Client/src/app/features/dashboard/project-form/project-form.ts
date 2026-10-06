import { Component, ChangeDetectionStrategy, input, inject, signal, computed, effect } from '@angular/core';
import { RouterLink } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { valueOr } from '@core/utils/resource';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectsApi } from '@core/api/projects.api';
import { ToastService } from '@core/services/toast.service';
import { isNotFound, serverMessage } from '@core/utils/http-error';
import { AdminPageHeader } from '@features/dashboard/admin-page-header/admin-page-header';
import { AdminField } from '@features/dashboard/admin-field/admin-field';
import { StringListField } from '@features/dashboard/string-list-field/string-list-field';
import { ApiState } from '@shared/ui/api-state/api-state';

@Component({
  selector: 'app-project-form',
  imports: [RouterLink, ReactiveFormsModule, AdminPageHeader, AdminField, StringListField, ApiState],
  templateUrl: './project-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class ProjectForm {
  /** Bound from the `:id` route parameter – present when editing. */
  readonly id = input<string>();

  private readonly api = inject(ProjectsApi);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);

  protected readonly isEdit = computed(() => !!this.id());
  protected readonly existing = rxResource({
    params: () => this.id(),
    stream: ({ params }) => this.api.getById(params),
  });
  private readonly all = rxResource({ stream: () => this.api.list() });

  protected readonly notFound = computed(() => isNotFound(this.existing.error()));
  protected readonly loadFailed = computed(() => !!this.existing.error() && !this.notFound());
  protected readonly categories = computed(() => [...new Set(valueOr(this.all, []).map((p) => p.category))]);

  protected readonly saving = signal(false);
  protected readonly formError = signal('');

  protected readonly listFields = [
    { key: 'requirements', label: 'Requirements', hint: 'One per line' },
    { key: 'architecture', label: 'Architecture steps', hint: 'One per line, in order' },
    { key: 'technologies', label: 'Technologies', hint: 'One per line' },
    { key: 'aiCapabilities', label: 'AI capabilities', hint: 'One per line' },
    { key: 'engineeringFeatures', label: 'Engineering features', hint: 'One per line' },
    { key: 'challenges', label: 'Challenges', hint: 'One per line' },
    { key: 'decisions', label: 'Engineering decisions', hint: 'One per line' },
    { key: 'results', label: 'Results', hint: 'One per line' },
  ];

  protected readonly form = inject(NonNullableFormBuilder).group({
    id: ['', [Validators.required, Validators.pattern(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)]],
    title: ['', Validators.required],
    category: ['', Validators.required],
    status: ['In Progress'],
    featured: [false],
    shortDescription: ['', Validators.required],
    businessProblem: [''],
    solution: [''],
    requirements: [[] as string[]],
    architecture: [[] as string[]],
    technologies: [[] as string[]],
    aiCapabilities: [[] as string[]],
    engineeringFeatures: [[] as string[]],
    challenges: [[] as string[]],
    decisions: [[] as string[]],
    results: [[] as string[]],
  });

  constructor() {
    // fill the form once the project to edit has loaded
    effect(() => {
      const p = valueOr(this.existing, undefined);
      if (!p) return;
      this.form.reset({ ...p });
      this.form.controls.id.disable();
    });
    // suggest a slug from the title while creating
    this.form.controls.title.valueChanges.pipe(takeUntilDestroyed()).subscribe((title) => {
      if (!this.isEdit() && !this.form.controls.id.dirty) {
        this.form.controls.id.setValue(this.slugify(title));
      }
    });
  }

  protected err(name: 'id' | 'title' | 'category' | 'shortDescription'): string {
    const c = this.form.controls[name];
    if (!c.touched || c.valid) return '';
    return c.hasError('pattern') ? 'Use lowercase letters, numbers and dashes only' : 'This field is required';
  }

  protected submit(): void {
    this.formError.set('');
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.formError.set('Please fix the highlighted fields.');
      return;
    }
    const { id, ...rest } = this.form.getRawValue();
    this.saving.set(true);
    const request = this.isEdit() ? this.api.update(this.id()!, rest) : this.api.create({ id, ...rest });
    request.subscribe({
      next: (saved) => {
        this.toast.success(this.isEdit() ? `Saved "${saved.title}"` : `Created "${saved.title}"`);
        void this.router.navigate(['/admin/projects']);
      },
      error: (err) => {
        this.saving.set(false);
        this.formError.set(serverMessage(err, 'Could not save the project'));
      },
    });
  }

  private slugify(text: string): string {
    return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  }
}
