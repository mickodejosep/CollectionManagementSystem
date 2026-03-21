export interface CollectionRecord {
  id: string;
  collectorName: string;
  amount: number;
  collectionDate: string;
  remarks: string;
}

export interface CollectionPayload {
  collectorName: string;
  amount: number;
  collectionDate: string;
  remarks: string;
}