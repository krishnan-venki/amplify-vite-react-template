import { useState, useEffect } from 'react';
import { fetchAuthSession } from 'aws-amplify/auth';
import API_ENDPOINTS from '../config/api';
import type { Asset, GetAssetsResponse, AssetsSummary, AssetDisplayData, RiskLevel, WarrantyStatus, MaintenanceStatus } from '../types/asset';

interface UseAssetsResult {
  assets: Asset[];
  summary: AssetsSummary;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  getAssetDisplayData: (asset: Asset) => AssetDisplayData;
}

// Helper function to calculate asset display data
function calculateDisplayData(asset: Asset): AssetDisplayData {
  const now = new Date();
  const purchaseDate = new Date(asset.purchaseDate);
  
  // Calculate age
  const ageMs = now.getTime() - purchaseDate.getTime();
  const ageDays = ageMs / (1000 * 60 * 60 * 24);
  const ageYears = Math.floor(ageDays / 365.25);
  const ageMonths = Math.floor((ageDays % 365.25) / 30.44);
  
  // Calculate lifespan percentage
  const totalLifespanDays = asset.expectedLifespan * 365.25;
  const lifespanPercentage = Math.min(100, Math.round((ageDays / totalLifespanDays) * 100));
  
  // Warranty status
  let warrantyStatus: WarrantyStatus = 'none';
  if (asset.warrantyExpiration) {
    const warrantyDate = new Date(asset.warrantyExpiration);
    warrantyStatus = warrantyDate > now ? 'active' : 'expired';
  }
  
  // Maintenance status
  let maintenanceStatus: MaintenanceStatus = 'current';
  let daysUntilMaintenance: number | undefined;
  if (asset.nextMaintenanceDue) {
    const nextDue = new Date(asset.nextMaintenanceDue);
    const daysUntil = Math.floor((nextDue.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    daysUntilMaintenance = daysUntil;
    
    if (daysUntil < 0) {
      maintenanceStatus = 'overdue';
    } else if (daysUntil <= 30) {
      maintenanceStatus = 'due_soon';
    }
  }
  
  // Risk level based on evaluation
  let riskLevel: RiskLevel = 'low';
  if (asset.llmEvaluation) {
    const score = asset.llmEvaluation.risk_score;
    if (score >= 75) riskLevel = 'critical';
    else if (score >= 50) riskLevel = 'high';
    else if (score >= 25) riskLevel = 'medium';
  }
  
  // Needs attention flag
  const needsAttention = riskLevel === 'critical' || riskLevel === 'high' || maintenanceStatus === 'overdue';
  
  // Total maintenance cost
  const totalMaintenanceCost = asset.maintenanceHistory.reduce((sum, record) => sum + record.cost, 0);
  
  return {
    ageYears,
    ageMonths,
    lifespanPercentage,
    warrantyStatus,
    maintenanceStatus,
    daysUntilMaintenance,
    riskLevel,
    needsAttention,
    totalMaintenanceCost,
  };
}

export function useAssets(): UseAssetsResult {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [summary, setSummary] = useState<AssetsSummary>({
    total_assets: 0,
    high_risk_count: 0,
    due_for_maintenance: 0,
    total_replacement_cost_estimate: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAssets = async () => {
    try {
      setLoading(true);
      setError(null);

      const session = await fetchAuthSession();
      const token = session.tokens?.idToken?.toString();

      if (!token) {
        throw new Error('No authentication token available');
      }

      const response = await fetch(API_ENDPOINTS.ASSETS, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch assets: ${response.statusText}`);
      }

      const data: GetAssetsResponse = await response.json();
      console.log('🏡 Assets API Response:', data);
      
      setAssets(data.assets || []);
      setSummary(data.summary || {
        total_assets: 0,
        high_risk_count: 0,
        due_for_maintenance: 0,
        total_replacement_cost_estimate: 0,
      });
    } catch (err) {
      console.error('Error fetching assets:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch assets');
      // Set empty data on error
      setAssets([]);
      setSummary({
        total_assets: 0,
        high_risk_count: 0,
        due_for_maintenance: 0,
        total_replacement_cost_estimate: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  return {
    assets,
    summary,
    loading,
    error,
    refetch: fetchAssets,
    getAssetDisplayData: calculateDisplayData,
  };
}
