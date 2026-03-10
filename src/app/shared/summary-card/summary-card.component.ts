import { CurrencyPipe } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-summary-card',
  imports: [CurrencyPipe],
  templateUrl: './summary-card.component.html',
  styleUrl: './summary-card.component.scss'
})
export class SummaryCardComponent {
  readonly title = input.required<string>();
  readonly value = input.required<number>();
  readonly isCurrency = input<boolean>(false);
}
