import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProfileOrbit } from '@features/home/profile-orbit/profile-orbit';

@Component({
  selector: 'app-home-hero',
  imports: [RouterLink, ProfileOrbit],
  templateUrl: './home-hero.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class HomeHero {}
