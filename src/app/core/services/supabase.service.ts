import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  public supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      'https://yaajgrgtboituyqmetys.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhYWpncmd0Ym9pdHV5cW1ldHlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwOTI1MzIsImV4cCI6MjA4ODY2ODUzMn0.ez3ic-cVW59LZglSKcjOZoFtrWDuvR3qEAgT1AyDrB4'
    );
  }
}