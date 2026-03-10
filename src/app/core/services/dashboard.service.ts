import { Injectable, computed, inject } from '@angular/core';
import { CollectionService } from './collection.service';
import { DashboardSummary } from '../models/collection.model';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private readonly collectionService = inject(CollectionService);

  readonly summary = computed<DashboardSummary>(() => {
    const records = this.collectionService.collections();
    const now = new Date();
    const totalCollectionsThisMonth = records
      .filter((record) => {
        const date = new Date(record.collectionDate);
        return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
      })
      .reduce((sum, record) => sum + record.amount, 0);

    return {
      totalUsers: 42,
      totalCollectionsThisMonth,
      overallCollections: records.reduce((sum, record) => sum + record.amount, 0)
    };
  });

  readonly monthlySeries = computed(() => {
    const records = this.collectionService.collections();
    const monthly = new Array<number>(12).fill(0);
    records.forEach((record) => {
      const month = new Date(record.collectionDate).getMonth();
      if (month >= 0) {
        monthly[month] += record.amount;
      }
    });
    return monthly;
  });
}
