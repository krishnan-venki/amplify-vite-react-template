import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Asset, AssetType, AssetDisplayData, RiskLevel, Condition } from '../../types/asset';

interface AssetsTableProps {
  assets: Asset[];
  getDisplayData: (asset: Asset) => AssetDisplayData;
  onAssetClick: (asset: Asset) => void;
}

type SortField = 'name' | 'age' | 'risk' | 'cost' | 'nextAction';
type SortDirection = 'asc' | 'desc';

export const AssetsTable: React.FC<AssetsTableProps> = ({ assets, getDisplayData, onAssetClick }) => {
  const navigate = useNavigate();
  const [sortField, setSortField] = useState<SortField>('risk');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [filterType, setFilterType] = useState<'all' | AssetType>('all');
  const [filterRisk, setFilterRisk] = useState<'all' | 'high' | 'due'>('all');
  const [filterCondition, setFilterCondition] = useState<'all' | Condition>('all');

  const handleAskSagaa = (e: React.MouseEvent, asset: Asset) => {
    e.stopPropagation(); // Prevent row click from triggering
    const displayData = getDisplayData(asset);
    
    const assetContext = {
      type: 'asset' as const,
      asset_id: asset.assetId,
      assetName: asset.assetName,
      assetType: asset.assetType,
      location: asset.category,
      risk_score: asset.llmEvaluation?.risk_score || 0,
      condition: asset.llmEvaluation?.condition_assessment.current_condition || 'Unknown',
      age_years: displayData.ageYears,
      lifespan_years: asset.expectedLifespan,
      replacement_cost: asset.llmEvaluation?.estimated_replacement_cost || 0,
      maintenance_status: asset.llmEvaluation?.replacement_planning.recommend_replacement ? 'Replacement Recommended' : 'Maintained',
      gradient: 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 50%, #0284c7 100%)',
      // Detailed data for tabs
      maintenanceHistory: asset.maintenanceHistory,
      evaluation: asset.llmEvaluation
    };

    navigate('/chat', { state: { context: assetContext } });
  };

  const getRiskBadge = (riskLevel: RiskLevel, score?: number) => {
    const configs = {
      critical: { bg: '#fef2f2', color: '#ef4444', border: '#fecaca', icon: '🔴' },
      high: { bg: '#fef2f2', color: '#ef4444', border: '#fecaca', icon: '🔴' },
      medium: { bg: '#fefce8', color: '#f59e0b', border: '#fef08a', icon: '🟡' },
      low: { bg: '#f0fdf4', color: '#10b981', border: '#bbf7d0', icon: '🟢' },
    };
    const config = configs[riskLevel];
    
    return (
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '4px 12px',
        borderRadius: '6px',
        backgroundColor: config.bg,
        border: `1px solid ${config.border}`,
        fontSize: '13px',
        fontWeight: '600'
      }}>
        <span>{config.icon}</span>
        <span style={{ color: config.color }}>
          {score !== undefined ? score : riskLevel.toUpperCase()}
        </span>
      </div>
    );
  };

  const getConditionBadge = (condition: Condition) => {
    const configs = {
      excellent: { icon: '✨', color: '#10b981' },
      good: { icon: '✅', color: '#10b981' },
      fair: { icon: '⚠️', color: '#f59e0b' },
      poor: { icon: '❌', color: '#ef4444' },
      critical: { icon: '🚨', color: '#ef4444' },
    };
    const config = configs[condition];
    
    return (
      <span style={{ color: config.color, fontSize: '14px', fontWeight: '500' }}>
        {config.icon} {condition.charAt(0).toUpperCase() + condition.slice(1)}
      </span>
    );
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Filter and sort assets
  const filteredAndSortedAssets = useMemo(() => {
    let filtered = [...assets];

    // Apply type filter
    if (filterType !== 'all') {
      filtered = filtered.filter(a => a.assetType === filterType);
    }

    // Apply risk filter
    if (filterRisk === 'high') {
      filtered = filtered.filter(a => {
        const displayData = getDisplayData(a);
        return displayData.riskLevel === 'high' || displayData.riskLevel === 'critical';
      });
    } else if (filterRisk === 'due') {
      filtered = filtered.filter(a => {
        const displayData = getDisplayData(a);
        return displayData.maintenanceStatus === 'due_soon' || displayData.maintenanceStatus === 'overdue';
      });
    }

    // Apply condition filter
    if (filterCondition !== 'all') {
      filtered = filtered.filter(a => a.llmEvaluation?.condition_assessment.current_condition === filterCondition);
    }

    // Sort
    filtered.sort((a, b) => {
      let aVal, bVal;
      
      switch (sortField) {
        case 'name':
          aVal = a.assetName.toLowerCase();
          bVal = b.assetName.toLowerCase();
          break;
        case 'age':
          aVal = getDisplayData(a).lifespanPercentage;
          bVal = getDisplayData(b).lifespanPercentage;
          break;
        case 'risk':
          aVal = a.llmEvaluation?.risk_score || 0;
          bVal = b.llmEvaluation?.risk_score || 0;
          break;
        case 'cost':
          aVal = a.llmEvaluation?.estimated_replacement_cost || 0;
          bVal = b.llmEvaluation?.estimated_replacement_cost || 0;
          break;
        case 'nextAction':
          const aDate = a.nextMaintenanceDue ? new Date(a.nextMaintenanceDue).getTime() : Infinity;
          const bDate = b.nextMaintenanceDue ? new Date(b.nextMaintenanceDue).getTime() : Infinity;
          aVal = aDate;
          bVal = bDate;
          break;
        default:
          return 0;
      }

      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [assets, filterType, filterRisk, filterCondition, sortField, sortDirection, getDisplayData]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <span style={{ opacity: 0.3 }}>⇅</span>;
    return <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>;
  };

  return (
    <div style={{ marginTop: '24px' }}>
      {/* Filters */}
      <div style={{
        display: 'flex',
        gap: '12px',
        marginBottom: '20px',
        flexWrap: 'wrap'
      }}>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as any)}
          style={{
            padding: '8px 12px',
            borderRadius: '8px',
            border: '1px solid #e5e7eb',
            fontSize: '14px',
            backgroundColor: 'white',
            cursor: 'pointer'
          }}
        >
          <option value="all">All Types</option>
          <option value="appliance">Appliance</option>
          <option value="vehicle">Vehicle</option>
          <option value="home_system">Home System</option>
          <option value="electronics">Electronics</option>
          <option value="property">Property</option>
          <option value="outdoor_equipment">Outdoor Equipment</option>
        </select>

        <select
          value={filterRisk}
          onChange={(e) => setFilterRisk(e.target.value as any)}
          style={{
            padding: '8px 12px',
            borderRadius: '8px',
            border: '1px solid #e5e7eb',
            fontSize: '14px',
            backgroundColor: 'white',
            cursor: 'pointer'
          }}
        >
          <option value="all">All Risk Levels</option>
          <option value="high">High Risk Only</option>
          <option value="due">Due for Maintenance</option>
        </select>

        <select
          value={filterCondition}
          onChange={(e) => setFilterCondition(e.target.value as any)}
          style={{
            padding: '8px 12px',
            borderRadius: '8px',
            border: '1px solid #e5e7eb',
            fontSize: '14px',
            backgroundColor: 'white',
            cursor: 'pointer'
          }}
        >
          <option value="all">All Conditions</option>
          <option value="excellent">Excellent</option>
          <option value="good">Good</option>
          <option value="fair">Fair</option>
          <option value="poor">Poor</option>
          <option value="critical">Critical</option>
        </select>
      </div>

      {/* Table */}
      <div style={{ 
        overflowX: 'auto',
        border: '1px solid #e5e7eb',
        borderRadius: '12px',
        backgroundColor: 'white'
      }}>
        <table style={{ 
          width: '100%', 
          borderCollapse: 'collapse',
          fontSize: '14px'
        }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e5e7eb', backgroundColor: '#f9fafb' }}>
              <th 
                onClick={() => handleSort('name')}
                style={{ 
                  padding: '16px', 
                  textAlign: 'left', 
                  fontWeight: '600',
                  cursor: 'pointer',
                  userSelect: 'none'
                }}
              >
                Asset Name <SortIcon field="name" />
              </th>
              <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600' }}>Type</th>
              <th 
                onClick={() => handleSort('age')}
                style={{ 
                  padding: '16px', 
                  textAlign: 'left', 
                  fontWeight: '600',
                  cursor: 'pointer',
                  userSelect: 'none'
                }}
              >
                Age/Lifespan <SortIcon field="age" />
              </th>
              <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600' }}>Condition</th>
              <th 
                onClick={() => handleSort('risk')}
                style={{ 
                  padding: '16px', 
                  textAlign: 'left', 
                  fontWeight: '600',
                  cursor: 'pointer',
                  userSelect: 'none'
                }}
              >
                Risk <SortIcon field="risk" />
              </th>
              <th 
                onClick={() => handleSort('nextAction')}
                style={{ 
                  padding: '16px', 
                  textAlign: 'left', 
                  fontWeight: '600',
                  cursor: 'pointer',
                  userSelect: 'none'
                }}
              >
                Next Action <SortIcon field="nextAction" />
              </th>
              <th 
                onClick={() => handleSort('cost')}
                style={{ 
                  padding: '16px', 
                  textAlign: 'right', 
                  fontWeight: '600',
                  cursor: 'pointer',
                  userSelect: 'none'
                }}
              >
                Est. Cost <SortIcon field="cost" />
              </th>
              <th style={{ padding: '16px', textAlign: 'center', fontWeight: '600', width: '80px' }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedAssets.map((asset) => {
              const displayData = getDisplayData(asset);
              const condition = asset.llmEvaluation?.condition_assessment.current_condition || 'good';
              
              return (
                <tr
                  key={asset.assetId}
                  style={{
                    borderBottom: '1px solid #f3f4f6',
                    transition: 'background-color 0.15s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <td style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontWeight: '500', color: '#1f2937' }}>
                        {asset.assetName}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAssetClick(asset);
                        }}
                        style={{
                          background: 'transparent',
                          border: '1px solid #e5e7eb',
                          borderRadius: '6px',
                          width: '28px',
                          height: '28px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          fontSize: '16px',
                          color: '#6b7280',
                          transition: 'all 0.2s ease',
                          padding: '0'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = '#0369a1';
                          e.currentTarget.style.backgroundColor = '#eff6ff';
                          e.currentTarget.style.color = '#0369a1';
                          e.currentTarget.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = '#e5e7eb';
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = '#6b7280';
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                        title="View asset details"
                      >
                        ⋯
                      </button>
                    </div>
                  </td>
                  <td style={{ padding: '16px', color: '#6b7280', textTransform: 'capitalize' }}>
                    {asset.assetType.replace('_', ' ')}
                  </td>
                  <td style={{ padding: '16px', color: '#6b7280' }}>
                    {displayData.ageYears}y / {asset.expectedLifespan}y ({displayData.lifespanPercentage}%)
                  </td>
                  <td style={{ padding: '16px' }}>
                    {getConditionBadge(condition)}
                  </td>
                  <td style={{ padding: '16px' }}>
                    {getRiskBadge(displayData.riskLevel, asset.llmEvaluation?.risk_score)}
                  </td>
                  <td style={{ padding: '16px', color: '#6b7280' }}>
                    {asset.llmEvaluation?.replacement_planning.recommend_replacement 
                      ? `Replace in ${asset.llmEvaluation.lifespan_remaining}`
                      : asset.nextMaintenanceDue 
                        ? `Maintenance ${displayData.maintenanceStatus === 'overdue' ? 'overdue' : `due ${new Date(asset.nextMaintenanceDue).toLocaleDateString()}`}`
                        : 'Monitor'}
                  </td>
                  <td style={{ padding: '16px', textAlign: 'right', fontWeight: '600', color: '#1f2937' }}>
                    {asset.llmEvaluation?.estimated_replacement_cost 
                      ? formatCurrency(asset.llmEvaluation.estimated_replacement_cost)
                      : '-'}
                  </td>
                  <td 
                    style={{ padding: '16px', textAlign: 'center' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center' }}>
                      {/* View Details Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAssetClick(asset);
                        }}
                        style={{
                          background: 'none',
                          border: '1px solid #e5e7eb',
                          borderRadius: '6px',
                          width: '32px',
                          height: '32px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          color: '#6b7280'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = '#0369a1';
                          e.currentTarget.style.backgroundColor = '#eff6ff';
                          e.currentTarget.style.color = '#0369a1';
                          e.currentTarget.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = '#e5e7eb';
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = '#6b7280';
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                        title="View asset details"
                      >
                        <span style={{ fontSize: '16px' }}>📋</span>
                      </button>

                      {/* Ask Sagaa Button */}
                      <button
                        onClick={(e) => handleAskSagaa(e, asset)}
                        style={{
                          background: 'none',
                          border: '1px solid #e5e7eb',
                          borderRadius: '6px',
                          width: '32px',
                          height: '32px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          color: '#6b7280'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = '#0369a1';
                          e.currentTarget.style.backgroundColor = '#eff6ff';
                          e.currentTarget.style.color = '#0369a1';
                          e.currentTarget.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = '#e5e7eb';
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = '#6b7280';
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                        title="Ask Sagaa about this asset"
                      >
                        <span style={{ fontSize: '16px' }}>💬</span>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        
        {filteredAndSortedAssets.length === 0 && (
          <div style={{ 
            padding: '48px',
            textAlign: 'center',
            color: '#9ca3af'
          }}>
            No assets found matching the selected filters.
          </div>
        )}
      </div>
    </div>
  );
};
