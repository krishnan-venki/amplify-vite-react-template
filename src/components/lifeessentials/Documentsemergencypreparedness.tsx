import React from 'react';

export const DocumentsEmergencyPreparedness: React.FC = () => {
  return (
    <section style={{
      padding: '80px 0',
      backgroundColor: 'white'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 24px'
      }}>
        {/* Section Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '64px'
        }}>
          <div style={{
            display: 'inline-block',
            padding: '8px 20px',
            backgroundColor: '#fce7f3',
            borderRadius: '24px',
            marginBottom: '16px'
          }}>
            <span style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#9f1239',
              letterSpacing: '0.5px'
            }}>
              DOCUMENTS & EMERGENCY PREPAREDNESS
            </span>
          </div>
          <h2 style={{
            fontSize: 'clamp(36px, 4vw, 48px)',
            fontWeight: '600',
            color: '#1d1d1f',
            marginBottom: '24px',
            lineHeight: '1.2'
          }}>
            Security, Preparedness, Peace of Mind
          </h2>
          <p style={{
            fontSize: '18px',
            color: '#6b7280',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Your critical documents secured, insurance optimized, and emergency plans ready—so when life throws curveballs, you're prepared.
          </p>
        </div>

        {/* Digital Vault */}
        <div style={{
          backgroundColor: '#f0fdf4',
          borderRadius: '20px',
          padding: '48px',
          marginBottom: '48px',
          border: '1px solid #bbf7d0'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '40px',
            alignItems: 'center'
          }}>
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '16px'
              }}>
                <span style={{ fontSize: '40px' }}>🔒</span>
                <h3 style={{
                  fontSize: '28px',
                  fontWeight: '600',
                  color: '#1d1d1f',
                  margin: 0
                }}>
                  Secure Digital Vault
                </h3>
              </div>
              <p style={{
                fontSize: '16px',
                color: '#166534',
                lineHeight: '1.6',
                marginBottom: '24px'
              }}>
                Bank-level encryption for all your critical documents. Access them anywhere, anytime—but only with your authorization.
              </p>
              <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '20px',
                borderLeft: '4px solid #22c55e'
              }}>
                <div style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#166534',
                  marginBottom: '8px'
                }}>
                  What's Protected:
                </div>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  backgroundColor: 'transparent',
                  border: 'none',
                  gap: 0,
                  borderRadius: 0,
                  overflow: 'visible',
                  display: 'block'
                }}>
                  {[
                    'Property deeds & titles',
                    'Insurance policies (all types)',
                    'Wills, trusts, power of attorney',
                    'Birth certificates & passports',
                    'Tax returns & financial records',
                    'Medical records & advance directives'
                  ].map((item, idx) => (
                    <li key={idx} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '6px',
                      fontSize: '14px',
                      color: '#166534',
                      backgroundColor: 'transparent',
                      padding: 0
                    }}>
                      <span style={{ color: '#22c55e' }}>✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <div style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '32px',
                border: '1px solid #bbf7d0'
              }}>
                <div style={{
                  marginBottom: '24px',
                  textAlign: 'center'
                }}>
                  <div style={{
                    fontSize: '48px',
                    marginBottom: '12px'
                  }}>🛡️</div>
                  <h4 style={{
                    fontSize: '20px',
                    fontWeight: '600',
                    color: '#1d1d1f',
                    marginBottom: '8px'
                  }}>
                    Military-Grade Security
                  </h4>
                </div>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px'
                }}>
                  {[
                    { label: 'AES-256 Encryption', value: '100%' },
                    { label: 'Multi-Factor Auth', value: 'Required' },
                    { label: 'Zero-Knowledge Architecture', value: 'Enabled' },
                    { label: 'Access Logs', value: 'Complete' }
                  ].map((security, idx) => (
                    <div key={idx} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '12px',
                      backgroundColor: '#f0fdf4',
                      borderRadius: '8px',
                      border: '1px solid #bbf7d0'
                    }}>
                      <span style={{
                        fontSize: '14px',
                        color: '#166534',
                        fontWeight: '500'
                      }}>
                        {security.label}
                      </span>
                      <span style={{
                        fontSize: '14px',
                        fontWeight: '700',
                        color: '#22c55e'
                      }}>
                        {security.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Insurance Intelligence */}
        <div style={{
          backgroundColor: '#eff6ff',
          borderRadius: '20px',
          padding: '48px',
          marginBottom: '48px',
          border: '1px solid #93c5fd'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '40px'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '72px',
              height: '72px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
              marginBottom: '16px'
            }}>
              <span style={{ fontSize: '36px' }}>📋</span>
            </div>
            <h3 style={{
              fontSize: '32px',
              fontWeight: '600',
              color: '#1d1d1f',
              marginBottom: '16px'
            }}>
              Comprehensive Insurance Management
            </h3>
            <p style={{
              fontSize: '18px',
              color: '#1e40af',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Track all your insurance policies, identify coverage gaps, optimize costs, and never miss a renewal.
            </p>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px'
          }}>
            {[
              {
                icon: '🏠',
                title: 'Home Insurance',
                features: ['Coverage adequacy tracking', 'Renovation value updates', 'Claims history', 'Rate comparison']
              },
              {
                icon: '🚗',
                title: 'Auto Insurance',
                features: ['Multi-vehicle tracking', 'Coverage optimization', 'Accident documentation', 'Rate shopping alerts']
              },
              {
                icon: '❤️',
                title: 'Life & Health',
                features: ['Beneficiary management', 'Coverage reviews', 'Premium tracking', 'Policy comparisons']
              },
              {
                icon: '💼',
                title: 'Umbrella & Specialty',
                features: ['Liability coverage', 'Valuable items riders', 'Gap identification', 'Bundle opportunities']
              }
            ].map((insurance, idx) => (
              <div key={idx} style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '24px',
                border: '1px solid #93c5fd'
              }}>
                <div style={{
                  fontSize: '32px',
                  marginBottom: '12px',
                  textAlign: 'center'
                }}>
                  {insurance.icon}
                </div>
                <h4 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#1d1d1f',
                  marginBottom: '16px',
                  textAlign: 'center'
                }}>
                  {insurance.title}
                </h4>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  backgroundColor: 'transparent',
                  border: 'none',
                  gap: 0,
                  borderRadius: 0,
                  overflow: 'visible',
                  display: 'block'
                }}>
                  {insurance.features.map((feature, fidx) => (
                    <li key={fidx} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '8px',
                      marginBottom: '8px',
                      fontSize: '13px',
                      color: '#1e40af',
                      backgroundColor: 'transparent',
                      padding: 0
                    }}>
                      <span style={{ color: '#3b82f6', flexShrink: 0 }}>•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{
            marginTop: '32px',
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            border: '2px solid #3b82f6'
          }}>
            <p style={{
              fontSize: '15px',
              color: '#1e40af',
              lineHeight: '1.6',
              fontStyle: 'italic',
              margin: 0
            }}>
              <strong>Proactive Example:</strong> "Your homeowner's insurance renews in 30 days. Since your kitchen renovation last year (+$45K value), your coverage may be inadequate—68% of renovations aren't reported to insurance, leaving homeowners underinsured. Should I help you update your policy? This also affects your home equity calculation and refinancing options."
            </p>
          </div>
        </div>

        {/* Emergency Preparedness */}
        <div style={{
          backgroundColor: '#fef2f2',
          borderRadius: '20px',
          padding: '48px',
          marginBottom: '48px',
          border: '1px solid #fecaca'
        }}>
          <h3 style={{
            fontSize: '32px',
            fontWeight: '600',
            color: '#1d1d1f',
            marginBottom: '32px',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px'
          }}>
            <span style={{ fontSize: '40px' }}>🚨</span>
            Emergency & Disaster Preparedness
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            marginBottom: '32px'
          }}>
            {[
              {
                icon: '🎒',
                title: 'Emergency Kit Tracking',
                desc: 'Monitor supplies, expiration dates, and readiness status',
                items: ['Food & water (3-day supply)', 'First aid supplies', 'Flashlights & batteries', 'Emergency radio', 'Important documents copies']
              },
              {
                icon: '📞',
                title: 'Emergency Contacts',
                desc: 'Quick access to critical contacts and information',
                items: ['Family members', 'Medical providers', 'Insurance companies', 'Utilities & services', 'Local emergency services']
              },
              {
                icon: '🏠',
                title: 'Home Safety Info',
                desc: 'Essential knowledge for emergency situations',
                items: ['Utility shut-off locations', 'Evacuation routes', 'Safe meeting points', 'Generator operation', 'Backup power systems']
              }
            ].map((prep, idx) => (
              <div key={idx} style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '28px',
                border: '1px solid #fca5a5'
              }}>
                <div style={{
                  fontSize: '40px',
                  marginBottom: '12px',
                  textAlign: 'center'
                }}>
                  {prep.icon}
                </div>
                <h4 style={{
                  fontSize: '19px',
                  fontWeight: '600',
                  color: '#1d1d1f',
                  marginBottom: '8px',
                  textAlign: 'center'
                }}>
                  {prep.title}
                </h4>
                <p style={{
                  fontSize: '14px',
                  color: '#991b1b',
                  marginBottom: '16px',
                  textAlign: 'center',
                  lineHeight: '1.5'
                }}>
                  {prep.desc}
                </p>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  backgroundColor: 'transparent',
                  border: 'none',
                  gap: 0,
                  borderRadius: 0,
                  overflow: 'visible',
                  display: 'block'
                }}>
                  {prep.items.map((item, iidx) => (
                    <li key={iidx} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '8px',
                      marginBottom: '6px',
                      fontSize: '13px',
                      color: '#7f1d1d',
                      backgroundColor: 'transparent',
                      padding: 0
                    }}>
                      <span style={{ color: '#ef4444', flexShrink: 0 }}>✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {/* Weather Integration Example */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            borderLeft: '4px solid #ef4444'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px'
            }}>
              <div style={{
                fontSize: '32px',
                flexShrink: 0
              }}>
                🌨️
              </div>
              <div>
                <h4 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#991b1b',
                  marginBottom: '12px'
                }}>
                  Weather-Based Proactive Alerts
                </h4>
                <p style={{
                  fontSize: '15px',
                  color: '#7f1d1d',
                  lineHeight: '1.6',
                  fontStyle: 'italic',
                  margin: 0
                }}>
                  "Severe weather forecast: 2 feet of snow expected Friday-Sunday. Your emergency kit has 3-day food supply, but I don't see batteries for flashlights. Your furnace is 8 years old—if power fails, you'll need the backup generator. I can order batteries for delivery tomorrow, and I'll remind you to test the generator Thursday. Also, your driveway snow removal service (John from community marketplace) is already booked—want me to add you to his route?"
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Cross-Vertical Intelligence Example */}
        <div style={{
          marginTop: '48px',
          backgroundColor: '#ecfdf5',
          borderRadius: '16px',
          padding: '32px',
          border: '2px solid #10b981'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '16px'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              backgroundColor: '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <span style={{ fontSize: '24px' }}>🔗</span>
            </div>
            <div>
              <h4 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#065f46',
                marginBottom: '12px'
              }}>
                Cross-Vertical Risk Management
              </h4>
              <p style={{
                fontSize: '15px',
                color: '#047857',
                lineHeight: '1.6',
                fontStyle: 'italic',
                margin: 0
              }}>
                "Your home insurance renews in 30 days ($2,400/year). Since you bought the home (2019), you've made: kitchen renovation ($45K), new roof ($18K), finished basement ($32K). Your coverage hasn't been updated—you're underinsured by ~$95K. This affects: (1) Your home equity calculation for refinancing, (2) Your net worth tracking in Finance vertical, (3) Your emergency fund adequacy. I found 3 quotes with proper coverage: $2,680-2,850/year. The $280/year increase fits your budget with $140 monthly savings from your recent utility optimization."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DocumentsEmergencyPreparedness;