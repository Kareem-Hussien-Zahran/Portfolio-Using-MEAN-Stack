import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Notice } from '@shared/ui/notice/notice';

@Component({
  selector: 'app-certifications-card',
  imports: [Notice],
  templateUrl: './certifications-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
})
export class CertificationsCard {}
