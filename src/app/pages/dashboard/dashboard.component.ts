import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { DashboardService } from '../../core/services/dashboard.service';
import { SummaryCardComponent } from '../../shared/summary-card/summary-card.component';

@Component({
  selector: 'app-dashboard',
  imports: [SummaryCardComponent, CurrencyPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  private readonly dashboardService = inject(DashboardService);

  readonly summary = this.dashboardService.summary;
  readonly monthlySeries = this.dashboardService.monthlySeries;

  readonly maxValue = computed(() => Math.max(...this.monthlySeries(), 1));
}
