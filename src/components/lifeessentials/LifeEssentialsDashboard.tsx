import React, { useState, useEffect } from 'react';
import { useAssets } from '../../hooks/useAssets';
import { AssetOverviewCards } from './AssetOverviewCards';
import { AssetsTable } from './AssetsTable';
import { AssetCardList } from './AssetCardList';
import { EmptyStateAssets } from './EmptyStateAssets';
import { AssetDetailPanel } from './AssetDetailPanel';
import { AddAssetModal } from './AddAssetModal';
import { ComingSoonTab } from './ComingSoonTab';
import type { Asset, AssetFormData } from '../../types/asset';
import heroImage from '../../assets/LifeEssentials_Hero_Image.png';

type CapabilityTab = 'property' | 'household' | 'family' | 'documents';

export const LifeEssentialsDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<CapabilityTab>('property');
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  const { assets, summary, loading, error, refetch, getAssetDisplayData } = useAssets();

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleAddAsset = async (data: AssetFormData) => {
    console.log('Adding asset:', data);
    // TODO: Implement API call to add asset
    // For now, just refresh the list
    await refetch();
  };

  const capabilityTabs = [
    {
      id: 'property' as CapabilityTab,
      icon: '🏡',
      label: 'Property & Assets',
      active: true
    },
    {
      id: 'household' as CapabilityTab,
      icon: '🛒',
      label: 'Household Ops',
      active: false,
      comingSoonTitle: 'Household Operations & Automation',
      comingSoonDescription: 'Intelligent shopping with recurring purchase predictions, meal planning, inventory tracking, and subscription management. Coming soon!'
    },
    {
      id: 'family' as CapabilityTab,
      icon: '👨‍👩‍👧‍👦',
      label: 'Family & Life',
      active: false,
      comingSoonTitle: 'Family & Life Coordination',
      comingSoonDescription: 'Shared calendar, chore distribution, pet care coordination, child activity management, and elder care tracking. Coming soon!'
    },
    {
      id: 'documents' as CapabilityTab,
      icon: '🔒',
      label: 'Docs & Prep',
      active: false,
      comingSoonTitle: 'Documents & Emergency Preparedness',
      comingSoonDescription: 'Secure vault for critical documents, insurance tracking, emergency readiness, and disaster preparedness. Coming soon!'
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f9fafb'
    }}>
      {/* Hero Header - Full Width */}
      <div style={{
        background: 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 50%, #0284c7 100%)',
        padding: isMobile ? '24px 16px' : '32px 48px',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ 
          position: 'relative', 
          zIndex: 1, 
          maxWidth: '1400px', 
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '32px'
        }}>
          {/* Hero Image - Hidden on mobile, appears first (left side) */}
          {!isMobile && (
            <div style={{ flexShrink: 0 }}>
              <img 
                src={heroImage} 
                alt="Sagaa Life Essentials" 
                style={{ 
                  width: '240px',
                  height: 'auto',
                  objectFit: 'contain',
                  display: 'block'
                }} 
              />
            </div>
          )}

          {/* Title Section */}
          <div style={{ flex: 1 }}>
            <h1 style={{
              fontSize: isMobile ? '28px' : '36px',
              fontWeight: '100',
              marginBottom: '8px',
              lineHeight: '1.4',
              color: 'white'
            }}>
              <span style={{
                background: 'linear-gradient(135deg, #007AFF 0%, #00D2FF 50%, #34C759 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'transparent',
                display: 'inline-block',
                paddingBottom: '0.18em'
              }}>
                Sagaa Life Essentials
              </span>
            </h1>
            <p style={{
              fontSize: isMobile ? 'clamp(13px, 3vw, 14px)' : 'clamp(14px, 2vw, 18px)',
              color: '#d1d5db',
              marginBottom: '0'
            }}>
              Your Essentials, intelligently managed
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: isMobile ? '16px' : '32px'
      }}>
        {/* Capability Tabs */}
        <div style={{
          display: 'flex',
          gap: isMobile ? '8px' : '12px',
          marginBottom: '32px',
          overflowX: 'auto',
          paddingBottom: '4px'
        }}>
          {capabilityTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: isMobile ? '10px 16px' : '12px 20px',
                border: 'none',
                borderRadius: '10px',
                fontSize: isMobile ? '13px' : '14px',
                fontWeight: '600',
                cursor: tab.active ? 'pointer' : 'not-allowed',
                opacity: tab.active ? 1 : 0.6,
                background: activeTab === tab.id ? 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 50%, #0284c7 100%)' : 'white',
                color: activeTab === tab.id ? 'white' : '#1f2937',
                boxShadow: activeTab === tab.id ? '0 4px 12px rgba(12, 74, 110, 0.3)' : '0 1px 3px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
                flexShrink: 0
              }}
              onMouseEnter={(e) => {
                if (tab.active && activeTab !== tab.id) {
                  e.currentTarget.style.backgroundColor = '#eff6ff';
                  e.currentTarget.style.color = '#0369a1';
                }
              }}
              onMouseLeave={(e) => {
                if (tab.active && activeTab !== tab.id) {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.color = '#1f2937';
                }
              }}
            >
              <span style={{ fontSize: '18px' }}>{tab.icon}</span>
              <span>{tab.label}</span>
              {!tab.active && (
                <span style={{
                  fontSize: '10px',
                  padding: '2px 6px',
                  backgroundColor: 'rgba(3, 105, 161, 0.15)',
                  borderRadius: '4px',
                  color: '#0369a1',
                  fontWeight: '700'
                }}>
                  SOON
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: isMobile ? '20px' : '32px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
          {activeTab === 'property' ? (
            <>
              {loading ? (
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: '400px',
                  color: '#9ca3af'
                }}>
                  <div>
                    <div style={{ fontSize: '48px', marginBottom: '16px', textAlign: 'center' }}>🔄</div>
                    <div>Loading assets...</div>
                  </div>
                </div>
              ) : error ? (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: '400px',
                  color: '#ef4444'
                }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
                  <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>Error Loading Assets</div>
                  <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '24px' }}>{error}</div>
                  <button
                    onClick={refetch}
                    style={{
                      padding: '10px 20px',
                      background: 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 50%, #0284c7 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      boxShadow: '0 2px 8px rgba(12, 74, 110, 0.3)'
                    }}
                  >
                    Try Again
                  </button>
                </div>
              ) : assets.length === 0 ? (
                <EmptyStateAssets onAddAsset={() => setIsAddModalOpen(true)} />
              ) : (
                <>
                  <AssetOverviewCards
                    summary={summary}
                    onAddAsset={() => setIsAddModalOpen(true)}
                  />
                  
                  {isMobile ? (
                    <AssetCardList
                      assets={assets}
                      getDisplayData={getAssetDisplayData}
                      onAssetClick={setSelectedAsset}
                    />
                  ) : (
                    <AssetsTable
                      assets={assets}
                      getDisplayData={getAssetDisplayData}
                      onAssetClick={setSelectedAsset}
                    />
                  )}
                </>
              )}
            </>
          ) : (
            <>
              {capabilityTabs.find(t => t.id === activeTab)?.comingSoonTitle && (
                <ComingSoonTab
                  icon={capabilityTabs.find(t => t.id === activeTab)?.icon || '🚧'}
                  title={capabilityTabs.find(t => t.id === activeTab)?.comingSoonTitle || 'Coming Soon'}
                  description={capabilityTabs.find(t => t.id === activeTab)?.comingSoonDescription || 'This feature is under development.'}
                />
              )}
            </>
          )}
        </div>

        {/* Asset Detail Panel */}
        {selectedAsset && (
          <AssetDetailPanel
            asset={selectedAsset}
            displayData={getAssetDisplayData(selectedAsset)}
            onClose={() => setSelectedAsset(null)}
          />
        )}

        {/* Add Asset Modal */}
        <AddAssetModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAddAsset}
        />
      </div>
    </div>
  );
};
