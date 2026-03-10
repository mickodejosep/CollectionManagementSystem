import { Injectable, signal } from '@angular/core';
import { CollectionRecord } from '../models/collection.model';

@Injectable({ providedIn: 'root' })
export class CollectionService {
  private readonly storageKey = 'cms-collections';
  readonly collections = signal<CollectionRecord[]>(this.loadInitialData());

  addCollection(record: Omit<CollectionRecord, 'id'>): void {
    const next: CollectionRecord = { ...record, id: crypto.randomUUID() };
    this.collections.update((current) => [next, ...current]);
    this.persist();
  }

  updateCollection(id: string, updated: Omit<CollectionRecord, 'id'>): void {
    this.collections.update((current) =>
      current.map((record) => (record.id === id ? { ...updated, id } : record))
    );
    this.persist();
  }

  deleteCollection(id: string): void {
    this.collections.update((current) => current.filter((record) => record.id !== id));
    this.persist();
  }

  private persist(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.collections()));
  }

  private loadInitialData(): CollectionRecord[] {
    const raw = localStorage.getItem(this.storageKey);
    if (raw) {
      return JSON.parse(raw) as CollectionRecord[];
    }

    return [
      {
        id: 'seed-1',
        collectorName: 'Alex Johnson',
        amount: 1520,
        collectionDate: new Date().toISOString().slice(0, 10),
        remarks: 'Community center collection'
      },
      {
        id: 'seed-2',
        collectorName: 'Priya Singh',
        amount: 880,
        collectionDate: new Date(Date.now() - 86400000 * 8).toISOString().slice(0, 10),
        remarks: 'Monthly recurring donors'
      }
    ];
  }
}
