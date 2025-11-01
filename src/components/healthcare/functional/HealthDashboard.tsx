import React, { useState, useEffect, useRef } from 'react';
import { Activity, Calendar, Pill, AlertCircle, CheckCircle2, Heart, ChevronDown } from 'lucide-react';
import { ConnectEpicButton } from '..';
import { useEpicConnection } from '../../../hooks/useEpicConnection';
import { HealthcareHeader } from './HealthcareHeader';

type HealthcareTab = 'myHealth' | 'medications' | 'mentalHealth' | 'familyHealth' | 'preventiveCare';

/**
 * ComingSoonTab Component for Healthcare
 */
const ComingSoonTab: React.FC<{ icon: string; title: string; description: string }> = ({ icon, title, description }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '400px',
      padding: '48px 24px',
      textAlign: 'center'
    }}>
      <div style={{
        fontSize: '80px',
        marginBottom: '24px',
        opacity: 0.8
      }}>
        {icon}
      </div>
      <h2 style={{
        fontSize: '28px',
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: '16px'
      }}>
        {title}
      </h2>
      <p style={{
        fontSize: '16px',
        color: '#6b7280',
        maxWidth: '600px',
        lineHeight: '1.6',
        marginBottom: '32px'
      }}>
        {description}
      </p>
      <div style={{
        display: 'inline-block',
        backgroundColor: '#eff6ff',
        color: '#0369a1',
        padding: '12px 24px',
        borderRadius: '8px',
        fontWeight: '600',
        fontSize: '14px',
        border: '1px solid #93c5fd'
      }}>
        Coming Soon
      </div>
    </div>
  );
};

/**
 * Healthcare Dashboard
 * 
 * Main dashboard for logged-in users to manage their Epic MyChart connection
 * and view health records. Displays connection status and patient information.
 */
export default function HealthDashboard() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [activeTab, setActiveTab] = useState<HealthcareTab>('myHealth');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);
  const { isConnected, isLoading, patientData, disconnect, refresh } = useEpicConnection();

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close settings dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setSettingsOpen(false);
      }
    };
    if (settingsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [settingsOpen]);

  const handleDisconnect = async () => {
    if (confirm('Are you sure you want to disconnect from Epic MyChart?')) {
      try {
        await disconnect();
        alert('Successfully disconnected from Epic MyChart');
      } catch (error) {
        alert('Failed to disconnect. Please try again.');
      }
    }
  };

  const handleResync = async () => {
    try {
      await refresh();
      alert('Records synced successfully!');
    } catch (error) {
      alert('Failed to sync records. Please try again.');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f8fafc'
    }}>
      {/* Hero Header */}
      <HealthcareHeader />

      {/* Main Content Container */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: isMobile ? '16px' : '32px'
      }}>
        {/* Capability Tabs */}
        <div
          style={{
            display: 'flex',
            gap: isMobile ? '8px' : '12px',
            marginBottom: '32px',
            overflowX: 'auto',
            paddingBottom: '4px'
          }}
        >
          {[
            { id: 'myHealth' as HealthcareTab, icon: '❤️', label: 'My Health' },
            { id: 'medications' as HealthcareTab, icon: '💊', label: 'Medications' },
            { id: 'mentalHealth' as HealthcareTab, icon: '🧠', label: 'Mental Health' },
            { id: 'familyHealth' as HealthcareTab, icon: '👨‍👩‍👧‍👦', label: 'Family Health' },
            { id: 'preventiveCare' as HealthcareTab, icon: '🛡️', label: 'Preventive Care' },
          ].map((tab) => (
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
                cursor: 'pointer',
                background: activeTab === tab.id 
                  ? 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 50%, #0284c7 100%)' 
                  : 'white',
                color: activeTab === tab.id ? 'white' : '#1f2937',
                boxShadow: activeTab === tab.id 
                  ? '0 4px 12px rgba(12, 74, 110, 0.3)' 
                  : '0 1px 3px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
                flexShrink: 0
              }}
              onMouseEnter={(e) => {
                if (activeTab !== tab.id) {
                  e.currentTarget.style.backgroundColor = '#eff6ff';
                  e.currentTarget.style.color = '#0369a1';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== tab.id) {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.color = '#1f2937';
                }
              }}
            >
              <span style={{ fontSize: '18px' }}>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* My Health Tab Content */}
        {activeTab === 'myHealth' && (
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: isMobile ? '20px' : '32px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
            }}
          >
            {/* My Health Header Bar */}
            {!isLoading && isConnected && (
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: '24px',
                marginBottom: '24px',
                borderBottom: '1px solid #e5e7eb'
              }}>
                {/* Left: Connection Status */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 16px',
                      backgroundColor: '#ecfdf5',
                      borderRadius: '8px',
                      border: '1px solid #a7f3d0',
                      cursor: 'help'
                    }}
                    title={`Last synced: ${patientData?.updatedAt ? new Date(patientData.updatedAt).toLocaleString() : 'Recently'}`}
                  >
                    <CheckCircle2 size={18} color="#10b981" />
                    <span style={{ 
                      fontSize: '14px', 
                      fontWeight: '600', 
                      color: '#059669' 
                    }}>
                      Epic MyChart
                    </span>
                  </div>
                  {!isMobile && (
                    <span style={{ 
                      fontSize: '13px', 
                      color: '#6b7280'
                    }}>
                      Synced {patientData?.updatedAt ? new Date(patientData.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'recently'}
                    </span>
                  )}
                </div>

                {/* Right: Action Icons */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {/* Re-sync Button */}
                  <button
                    onClick={handleResync}
                    title="Re-sync health records"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '36px',
                      height: '36px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      backgroundColor: 'white',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f9fafb';
                      e.currentTarget.style.borderColor = '#9ca3af';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'white';
                      e.currentTarget.style.borderColor = '#d1d5db';
                    }}
                  >
                    <span style={{ fontSize: '18px' }}>🔄</span>
                  </button>

                  {/* Settings Dropdown */}
                  <div ref={settingsRef} style={{ position: 'relative' }}>
                    <button
                      onClick={() => setSettingsOpen(!settingsOpen)}
                      title="Health data settings"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '36px',
                        height: '36px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        backgroundColor: settingsOpen ? '#f9fafb' : 'white',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f9fafb';
                        e.currentTarget.style.borderColor = '#9ca3af';
                      }}
                      onMouseLeave={(e) => {
                        if (!settingsOpen) {
                          e.currentTarget.style.backgroundColor = 'white';
                          e.currentTarget.style.borderColor = '#d1d5db';
                        }
                      }}
                    >
                      <span style={{ fontSize: '18px' }}>⚙️</span>
                    </button>

                    {/* Dropdown Menu */}
                    {settingsOpen && (
                      <div style={{
                        position: 'absolute',
                        top: '44px',
                        right: '0',
                        width: '260px',
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '12px',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
                        zIndex: 1000,
                        overflow: 'hidden'
                      }}>
                        {/* Dropdown Header */}
                        <div style={{
                          padding: '12px 16px',
                          borderBottom: '1px solid #e5e7eb',
                          backgroundColor: '#f9fafb'
                        }}>
                          <div style={{
                            fontSize: '13px',
                            fontWeight: '600',
                            color: '#374151'
                          }}>
                            Health Data Settings
                          </div>
                        </div>

                        {/* Menu Items */}
                        <div style={{ padding: '8px 0' }}>
                          {[
                            { icon: '🔄', label: 'Auto-sync Settings', desc: 'Configure sync frequency' },
                            { icon: '📊', label: 'Data Preferences', desc: 'Choose what to sync' },
                            { icon: '🔔', label: 'Notifications', desc: 'Health alerts & reminders' },
                            { icon: '🔒', label: 'Privacy Settings', desc: 'Control data sharing' },
                            { icon: '📥', label: 'Export Health Data', desc: 'Download your records' },
                            { icon: '📖', label: 'Activity Log', desc: 'View sync history' },
                            { icon: '❓', label: 'Help & Support', desc: 'Get assistance' }
                          ].map((item, idx) => (
                            <button
                              key={idx}
                              onClick={() => {
                                setSettingsOpen(false);
                                alert(`${item.label} - Coming soon!`);
                              }}
                              style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '12px 16px',
                                border: 'none',
                                backgroundColor: 'transparent',
                                cursor: 'pointer',
                                textAlign: 'left',
                                transition: 'background-color 0.15s ease'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#f3f4f6';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                              }}
                            >
                              <span style={{ fontSize: '20px', flexShrink: 0 }}>{item.icon}</span>
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{
                                  fontSize: '14px',
                                  fontWeight: '500',
                                  color: '#1f2937',
                                  marginBottom: '2px'
                                }}>
                                  {item.label}
                                </div>
                                <div style={{
                                  fontSize: '12px',
                                  color: '#6b7280',
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis'
                                }}>
                                  {item.desc}
                                </div>
                              </div>
                              <ChevronDown size={14} color="#9ca3af" style={{ transform: 'rotate(-90deg)', flexShrink: 0 }} />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Disconnect Button */}
                  <button
                    onClick={handleDisconnect}
                    title="Disconnect from Epic MyChart"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '36px',
                      height: '36px',
                      border: '1px solid #fecaca',
                      borderRadius: '8px',
                      backgroundColor: 'white',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#fef2f2';
                      e.currentTarget.style.borderColor = '#f87171';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'white';
                      e.currentTarget.style.borderColor = '#fecaca';
                    }}
                  >
                    <span style={{ fontSize: '18px' }}>🔌</span>
                  </button>
                </div>
              </div>
            )}

            {/* Loading State */}
            {isLoading && (
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '200px',
                color: '#9ca3af'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>
                    🔄
                  </div>
                  <div>Loading your health records...</div>
                </div>
              </div>
            )}

            {/* Not Connected State */}
            {!isLoading && !isConnected && (
              <div style={{
                padding: '32px',
                textAlign: 'center'
              }}>
                <AlertCircle size={48} color="#f59e0b" style={{ marginBottom: '16px' }} />
                <h2 style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  color: '#1e293b',
                  marginBottom: '8px'
                }}>
                  Connect to Epic MyChart
                </h2>
                <p style={{ color: '#64748b', marginBottom: '16px', lineHeight: '1.6' }}>
                  Connect your Epic MyChart account to access your health records and enable intelligent health insights.
                </p>

                {/* Benefits List */}
                <div style={{
                  background: '#f0f9ff',
                  borderRadius: '12px',
                  padding: '20px',
                  marginBottom: '20px',
                  textAlign: 'left',
                  maxWidth: '600px',
                  margin: '0 auto 20px'
                }}>
                  <h3 style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: '#0369a1',
                    marginBottom: '12px'
                  }}>
                    What you'll get:
                  </h3>
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                  }}>
                    {[
                      'View your complete medical history',
                      'Track medications and prescriptions',
                      'Monitor lab results and vitals',
                      'See upcoming appointments',
                      'Get health-aware financial insights'
                    ].map((benefit, idx) => (
                      <li key={idx} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: '#475569',
                        fontSize: '0.95rem'
                      }}>
                        <CheckCircle2 size={16} color="#10b981" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Connect Button */}
                <ConnectEpicButton />

                {/* Epic Sandbox Note */}
                <div style={{
                  marginTop: '16px',
                  padding: '12px',
                  background: '#fef3c7',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  color: '#92400e',
                  maxWidth: '600px',
                  margin: '16px auto 0'
                }}>
                  <strong>Note:</strong> This is using Epic's sandbox environment with test data.
                  Use credentials: <code>fhirderrick</code> / <code>epicepic1</code>
                </div>
              </div>
            )}

        {/* Patient Information (shown when connected) */}
        {isConnected && patientData && (
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '32px',
            marginBottom: '24px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#1e293b',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <Activity size={24} color="#3b82f6" />
              Patient Information
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '16px'
            }}>
              <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '8px' }}>
                <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '4px' }}>
                  Name
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#1e293b' }}>
                  {patientData.normalizedData?.fullName || 'Unknown'}
                </div>
              </div>
              
              <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '8px' }}>
                <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '4px' }}>
                  Date of Birth
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#1e293b' }}>
                  {patientData.normalizedData?.birthDate || 'Unknown'}
                </div>
              </div>
              
              <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '8px' }}>
                <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '4px' }}>
                  Medical Record Number
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#1e293b' }}>
                  {patientData.normalizedData?.mrn || 'Unknown'}
                </div>
              </div>
              
              <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '8px' }}>
                <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '4px' }}>
                  Gender
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#1e293b' }}>
                  {patientData.normalizedData?.gender || 'Unknown'}
                </div>
              </div>
              
              {patientData.normalizedData?.phone && (
                <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '4px' }}>
                    Phone
                  </div>
                  <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#1e293b' }}>
                    {patientData.normalizedData.phone}
                  </div>
                </div>
              )}
              
              {patientData.normalizedData?.email && (
                <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '4px' }}>
                    Email
                  </div>
                  <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#1e293b' }}>
                    {patientData.normalizedData.email}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Coming Soon Features */}
        {!isConnected && !isLoading && (
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '32px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#1e293b',
              marginBottom: '20px'
            }}>
              Coming Soon
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '16px'
            }}>
              {[
                { icon: Pill, title: 'Medication Tracking', desc: 'Monitor your prescriptions and refills' },
                { icon: Calendar, title: 'Appointment Management', desc: 'View and schedule healthcare visits' },
                { icon: Activity, title: 'Lab Results', desc: 'Track test results and trends over time' },
                { icon: Heart, title: 'Vitals Monitoring', desc: 'Monitor blood pressure, weight, and more' }
              ].map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div key={idx} style={{
                    padding: '20px',
                    background: '#f8fafc',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0'
                  }}>
                    <Icon size={28} color="#3b82f6" style={{ marginBottom: '12px' }} />
                    <h3 style={{
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      color: '#1e293b',
                      marginBottom: '6px'
                    }}>
                      {feature.title}
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: '#64748b' }}>
                      {feature.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
          </div>
        )}

        {/* Medications Tab */}
        {activeTab === 'medications' && (
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: isMobile ? '20px' : '32px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
            }}
          >
            <ComingSoonTab
              icon="💊"
              title="Intelligent Medication Management"
              description="Context-aware reminders, effectiveness tracking, interaction prevention, cost optimization, and automatic refill predictions. Your personal medication assistant."
            />
          </div>
        )}

        {/* Mental Health Tab */}
        {activeTab === 'mentalHealth' && (
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: isMobile ? '20px' : '32px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
            }}
          >
            <ComingSoonTab
              icon="🧠"
              title="Mental Health & Wellness"
              description="Integrated mental health support with mood tracking, therapy coordination, psychiatric medication management, and mind-body insights. Whole-person care."
            />
          </div>
        )}

        {/* Family Health Tab */}
        {activeTab === 'familyHealth' && (
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: isMobile ? '20px' : '32px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
            }}
          >
            <ComingSoonTab
              icon="👨‍👩‍👧‍👦"
              title="Family Health Management"
              description="Manage health for your entire household—children, parents, partners. Coordinated scheduling, pediatric milestones, elder care, all in one place."
            />
          </div>
        )}

        {/* Preventive Care Tab */}
        {activeTab === 'preventiveCare' && (
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: isMobile ? '20px' : '32px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
            }}
          >
            <ComingSoonTab
              icon="🛡️"
              title="Preventive Care Intelligence"
              description="Personalized screening reminders based on age and risk factors, family history analysis, early warning detection, and proactive health guidance. Catch problems before they start."
            />
          </div>
        )}
      </div>
    </div>
  );
}
