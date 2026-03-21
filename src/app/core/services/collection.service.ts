import { Injectable, inject, signal } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { CollectionPayload, CollectionRecord } from '../models/collection.model';

interface CollectionRow {
  id: string;
  collector_name: string;
  amount: number;
  collection_date: string;
  remarks: string;
  created_at?: string;
  updated_at?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  private readonly supabaseService = inject(SupabaseService);

  readonly collections = signal<CollectionRecord[]>([]);

  constructor() {
    this.loadCollections();
  }

  async loadCollections(): Promise<void> {
    const { data, error } = await this.supabaseService.supabase
      .from('collections')
      .select('*')
      .order('collection_date', { ascending: false });

    if (error) {
      console.error('Failed to load collections:', error.message);
      return;
    }

    const mapped = (data ?? []).map((row: CollectionRow) => this.mapRowToRecord(row));
    this.collections.set(mapped);
  }

  async addCollection(payload: CollectionPayload): Promise<void> {
    const { error } = await this.supabaseService.supabase
      .from('collections')
      .insert([
        {
          collector_name: payload.collectorName,
          amount: payload.amount,
          collection_date: payload.collectionDate,
          remarks: payload.remarks
        }
      ]);

    if (error) {
      console.error('Failed to add collection:', error.message);
      return;
    }

    await this.loadCollections();
  }

  async updateCollection(id: string, payload: CollectionPayload): Promise<void> {
    const { error } = await this.supabaseService.supabase
      .from('collections')
      .update({
        collector_name: payload.collectorName,
        amount: payload.amount,
        collection_date: payload.collectionDate,
        remarks: payload.remarks
      })
      .eq('id', id);

    if (error) {
      console.error('Failed to update collection:', error.message);
      return;
    }

    await this.loadCollections();
  }

  async deleteCollection(id: string): Promise<void> {
    const { error } = await this.supabaseService.supabase
      .from('collections')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Failed to delete collection:', error.message);
      return;
    }

    await this.loadCollections();
  }

  private mapRowToRecord(row: CollectionRow): CollectionRecord {
    return {
      id: row.id,
      collectorName: row.collector_name,
      amount: Number(row.amount),
      collectionDate: row.collection_date,
      remarks: row.remarks
    };
  }
}