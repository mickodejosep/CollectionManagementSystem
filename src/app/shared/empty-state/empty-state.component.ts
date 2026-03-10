import { Component, input } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  template: '<div class="empty">{{ message() }}</div>',
  styleUrl: './empty-state.component.scss'
})
export class EmptyStateComponent {
  readonly message = input('No records found.');
}
