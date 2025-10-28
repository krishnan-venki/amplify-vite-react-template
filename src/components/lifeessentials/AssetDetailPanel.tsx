import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import type { Asset, AssetDisplayData } from '../../types/asset';
import sagaaLogo from '../../assets/sagaa_48x48.png';

interface AssetDetailPanelProps {
  asset: Asset;
  displayData: AssetDisplayData;
  onClose: () => void;
}

type DetailTab = 'overview' | 'maintenance' | 'evaluation' | 'insights';

export const AssetDetailPanel: React.FC<AssetDetailPanelProps> = ({ asset, displayData, onClose }) => {
  const [activeTab, setActiveTab] = useState<DetailTab>('overview');
  const navigate = useNavigate();

  const handleAskSagaa = () => {
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

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const tabs: { id: DetailTab; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'maintenance', label: 'Maintenance' },
    { id: 'evaluation', label: 'Evaluation' },
    { id: 'insights', label: 'Insights' }
  ];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      bottom: 0,
      width: '100%',
      maxWidth: '600px',
      backgroundColor: 'white',
      boxShadow: '-4px 0 24px rgba(0, 0, 0, 0.15)',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto'
    }}>
      {/* Header */}
      <div style={{
        padding: '24px',
        borderBottom: '1px solid #e5e7eb',
        position: 'sticky',
        top: 0,
        backgroundColor: 'white',
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginBottom: '16px' }}>
          <button
            onClick={onClose}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: '#ff9900',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 2px 8px rgba(255, 153, 0, 0.3)',
              padding: '0'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#e68a00';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 153, 0, 0.4)';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#ff9900';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(255, 153, 0, 0.3)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
            title="Close panel"
          >
            {/* Right arrow (close) icon */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1f2937', margin: '0' }}>
            {asset.assetName}
          </h2>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Ask Sagaa Button */}
            <button
              onClick={handleAskSagaa}
              style={{
                border: '1px solid #d1d5db',
                background: 'white',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                padding: '8px 16px',
                transition: 'all 0.2s ease',
                fontSize: '0.85rem',
                fontWeight: '600',
                color: '#7c3aed'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f5f3ff';
                e.currentTarget.style.borderColor = '#7c3aed';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'white';
                e.currentTarget.style.borderColor = '#d1d5db';
              }}
            >
              <MessageCircle size={16} strokeWidth={2.5} />
              Ask Sagaa
            </button>
          </div>
        </div>

        {/* Risk Score Banner */}
        {asset.llmEvaluation && (
          <div style={{
            backgroundColor: asset.llmEvaluation.risk_score >= 75 ? '#fef2f2' : asset.llmEvaluation.risk_score >= 50 ? '#fefce8' : '#f0fdf4',
            border: `1px solid ${asset.llmEvaluation.risk_score >= 75 ? '#fecaca' : asset.llmEvaluation.risk_score >= 50 ? '#fef08a' : '#bbf7d0'}`,
            borderRadius: '8px',
            padding: '12px',
            marginBottom: '16px'
          }}>
            <div style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937', marginBottom: '4px' }}>
              🎯 RISK SCORE: {asset.llmEvaluation.risk_score}/100 ({asset.llmEvaluation.replacement_urgency.toUpperCase()})
            </div>
            <div style={{ fontSize: '13px', color: '#6b7280' }}>
              Condition: {asset.llmEvaluation.condition_assessment.current_condition} | {displayData.ageYears} years old ({displayData.lifespanPercentage}% of lifespan)
            </div>
          </div>
        )}

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid #e5e7eb' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: 'none',
                border: 'none',
                padding: '12px 16px',
                fontSize: '14px',
                fontWeight: activeTab === tab.id ? '600' : '500',
                color: activeTab === tab.id ? '#0369a1' : '#6b7280',
                cursor: 'pointer',
                borderBottom: activeTab === tab.id ? '2px solid #0369a1' : '2px solid transparent',
                transition: 'all 0.2s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '24px', flex: 1 }}>
        {activeTab === 'overview' && (
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: '#1f2937' }}>
              📋 Basic Info
            </h3>
            <div style={{ marginBottom: '24px' }}>
              <InfoRow label="Manufacturer" value={asset.manufacturer} />
              <InfoRow label="Model" value={asset.model} />
              {asset.serialNumber && <InfoRow label="Serial Number" value={asset.serialNumber} />}
              <InfoRow label="Purchase Date" value={formatDate(asset.purchaseDate)} />
              <InfoRow label="Purchase Price" value={formatCurrency(asset.purchasePrice)} />
              <InfoRow label="Expected Lifespan" value={`${asset.expectedLifespan} years`} />
              <InfoRow label="Warranty" value={displayData.warrantyStatus === 'active' ? `Active until ${formatDate(asset.warrantyExpiration!)}` : displayData.warrantyStatus === 'expired' ? 'Expired' : 'No warranty'} />
            </div>

            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: '#1f2937' }}>
              📊 Lifecycle Status
            </h3>
            <div style={{
              width: '100%',
              height: '24px',
              backgroundColor: '#e5e7eb',
              borderRadius: '12px',
              overflow: 'hidden',
              marginBottom: '8px'
            }}>
              <div style={{
                width: `${displayData.lifespanPercentage}%`,
                height: '100%',
                backgroundColor: displayData.lifespanPercentage >= 75 ? '#ef4444' : displayData.lifespanPercentage >= 50 ? '#f59e0b' : '#10b981',
                transition: 'width 0.3s ease'
              }} />
            </div>
            <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '24px' }}>
              {displayData.lifespanPercentage}% of expected life used ({displayData.ageYears} years, {displayData.ageMonths} months)
            </p>

            {asset.llmEvaluation && (
              <>
                <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: '#1f2937' }}>
                  💡 AI Recommendation
                </h3>
                <div style={{
                  backgroundColor: '#f9fafb',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '16px',
                  marginBottom: '16px'
                }}>
                  <p style={{ fontSize: '14px', color: '#1f2937', lineHeight: '1.6', margin: 0 }}>
                    {asset.llmEvaluation.replacement_planning.recommend_replacement
                      ? `Replace within ${asset.llmEvaluation.lifespan_remaining}. Estimated cost: ${formatCurrency(asset.llmEvaluation.estimated_replacement_cost)}`
                      : 'Continue regular maintenance and monitoring.'}
                  </p>
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === 'maintenance' && (
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: '#1f2937' }}>
              📅 Maintenance History
            </h3>
            {asset.maintenanceHistory.length === 0 ? (
              <p style={{ color: '#9ca3af', textAlign: 'center', padding: '32px 0' }}>
                No maintenance records yet
              </p>
            ) : (
              <div>
                {asset.maintenanceHistory.map((record, index) => (
                  <div
                    key={index}
                    style={{
                      padding: '16px',
                      backgroundColor: '#f9fafb',
                      borderRadius: '8px',
                      marginBottom: '12px',
                      border: '1px solid #e5e7eb'
                    }}
                  >
                    <div style={{ fontWeight: '600', color: '#1f2937', marginBottom: '4px' }}>
                      ✓ {formatDate(record.date)} - {record.type}
                    </div>
                    <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '4px' }}>
                      Provider: {record.provider}
                    </div>
                    <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '4px' }}>
                      Cost: {formatCurrency(record.cost)}
                    </div>
                    {record.notes && (
                      <div style={{ fontSize: '13px', color: '#6b7280', marginTop: '8px', fontStyle: 'italic' }}>
                        Notes: {record.notes}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {asset.nextMaintenanceDue && (
              <div style={{
                padding: '16px',
                backgroundColor: displayData.maintenanceStatus === 'overdue' ? '#fef2f2' : '#fefce8',
                border: `1px solid ${displayData.maintenanceStatus === 'overdue' ? '#fecaca' : '#fef08a'}`,
                borderRadius: '8px',
                marginTop: '16px'
              }}>
                <div style={{ fontWeight: '600', color: '#1f2937', marginBottom: '4px' }}>
                  ⏰ Next Maintenance {displayData.maintenanceStatus === 'overdue' ? 'Overdue' : 'Due'}
                </div>
                <div style={{ fontSize: '13px', color: '#6b7280' }}>
                  {formatDate(asset.nextMaintenanceDue)}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'evaluation' && asset.llmEvaluation && (
          <div>
            <h3 style={{ 
              fontSize: '16px', 
              fontWeight: '600', 
              marginBottom: '16px', 
              color: '#1f2937',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <img src={sagaaLogo} alt="Sagaa Logo" style={{ width: '20px', height: '20px' }} />
              Latest Sagaa Evaluation
            </h3>
            <p style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '24px' }}>
              Generated: {formatDate(asset.llmEvaluation.lastEvaluatedAt)}
            </p>

            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px', color: '#1f2937' }}>
                📊 Condition Assessment
              </h4>
              <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '12px' }}>
                Current: <strong>{asset.llmEvaluation.condition_assessment.current_condition}</strong>
              </p>
              
              {asset.llmEvaluation.condition_assessment.key_factors.length > 0 && (
                <div style={{ marginBottom: '12px' }}>
                  <p style={{ fontSize: '13px', fontWeight: '600', color: '#6b7280', marginBottom: '8px' }}>
                    Key Factors:
                  </p>
                  <div style={{ paddingLeft: '0' }}>
                    {asset.llmEvaluation.condition_assessment.key_factors.map((factor, i) => (
                      <div key={i} style={{ 
                        fontSize: '13px', 
                        color: '#6b7280', 
                        marginBottom: '6px',
                        paddingLeft: '20px',
                        position: 'relative'
                      }}>
                        <span style={{
                          position: 'absolute',
                          left: '0',
                          top: '0'
                        }}>•</span>
                        {factor}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {asset.llmEvaluation.recommendations.length > 0 && (
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px', color: '#1f2937' }}>
                  🎯 Recommendations
                </h4>
                {asset.llmEvaluation.recommendations.map((rec, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '16px',
                      backgroundColor: '#f9fafb',
                      borderRadius: '8px',
                      marginBottom: '12px',
                      border: '1px solid #e5e7eb'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937' }}>
                        {i + 1}. {rec.action}
                      </span>
                      <span style={{ fontSize: '12px', fontWeight: '600', color: '#0369a1' }}>
                        Priority {rec.priority}
                      </span>
                    </div>
                    <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 8px 0' }}>
                      {rec.reasoning}
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#9ca3af' }}>
                      <span>Cost: {formatCurrency(rec.estimated_cost)}</span>
                      <span>Timeframe: {rec.timeframe.replace('_', ' ')}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'insights' && (
          <div style={{ textAlign: 'center', padding: '48px 0' }}>
            <span style={{ fontSize: '64px', marginBottom: '16px', display: 'block' }}>💡</span>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: '#1f2937' }}>
              Cross-Vertical Insights
            </h3>
            <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '24px' }}>
              Insights related to this asset will appear here
            </p>
            <div style={{
              display: 'inline-block',
              padding: '8px 16px',
              backgroundColor: '#eff6ff',
              color: '#0369a1',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '600'
            }}>
              Coming Soon
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper component for info rows
const InfoRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'space-between', 
    padding: '12px 0', 
    borderBottom: '1px solid #f3f4f6' 
  }}>
    <span style={{ fontSize: '14px', color: '#6b7280' }}>{label}</span>
    <span style={{ fontSize: '14px', fontWeight: '500', color: '#1f2937', textAlign: 'right' }}>{value}</span>
  </div>
);
