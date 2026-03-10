export interface CollectionRecord {
  id: string;
  collectorName: string;
  amount: number;
  collectionDate: string;
  remarks: string;
}

export interface DashboardSummary {
  totalUsers: number;
  totalCollectionsThisMonth: number;
  overallCollections: number;
}
