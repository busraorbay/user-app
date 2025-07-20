import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  imports: [CommonModule],
  template: `
    <div *ngIf="isLoading" class="loading">
      <div class="spinner"></div>
      <p>{{ message }}</p>
    </div>
  `,
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent {
  @Input() isLoading: boolean = false;
  @Input() message: string = 'Yükleniyor...';
}
