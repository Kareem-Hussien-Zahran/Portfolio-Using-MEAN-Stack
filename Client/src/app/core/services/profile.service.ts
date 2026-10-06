import { Injectable, computed, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProfileApi } from '../api/profile.api';
import { PROFILE } from '../data/profile.data';
import { Profile } from '../models/profile.model';
import { valueOr } from '../utils/resource';

/** Loads `GET /api/profile` once and shares it (header/footer/contact). Falls back to local defaults. */
@Injectable({ providedIn: 'root' })
export class ProfileService {
  private readonly api = inject(ProfileApi);
  private readonly resource = rxResource({ stream: () => this.api.get() });

  /** Re-fetches the profile (called by the dashboard after saving). */
  reload(): void {
    this.resource.reload();
  }

  readonly profile = computed<Profile>(() => ({ ...PROFILE, ...valueOr(this.resource, {}) }));
}
