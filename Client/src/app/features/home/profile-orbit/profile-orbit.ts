import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-profile-orbit',
  templateUrl: './profile-orbit.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class ProfileOrbit {}
