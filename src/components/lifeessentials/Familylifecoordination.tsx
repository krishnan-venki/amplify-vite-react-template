import React from 'react';

export const FamilyLifeCoordination: React.FC = () => {
  return (
    <section style={{
      padding: '80px 0',
      backgroundColor: '#f9fafb'
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
            backgroundColor: '#fef3c7',
            borderRadius: '24px',
            marginBottom: '16px'
          }}>
            <span style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#92400e',
              letterSpacing: '0.5px'
            }}>
              FAMILY & LIFE COORDINATION
            </span>
          </div>
          <h2 style={{
            fontSize: 'clamp(36px, 4vw, 48px)',
            fontWeight: '600',
            color: '#1d1d1f',
            marginBottom: '24px',
            lineHeight: '1.2'
          }}>
            Your Household, Perfectly Orchestrated
          </h2>
          <p style={{
            fontSize: '18px',
            color: '#6b7280',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            From family schedules to pet care, kids' activities to elder care—Sagaa keeps everyone coordinated and nothing forgotten.
          </p>
        </div>

        {/* Unified Family Calendar */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '48px',
          marginBottom: '48px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
          border: '1px solid #e5e7eb'
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
                <span style={{ fontSize: '40px' }}>📅</span>
                <h3 style={{
                  fontSize: '28px',
                  fontWeight: '600',
                  color: '#1d1d1f',
                  margin: 0
                }}>
                  Intelligent Family Calendar
                </h3>
              </div>
              <p style={{
                fontSize: '16px',
                color: '#4b5563',
                lineHeight: '1.6',
                marginBottom: '24px'
              }}>
                Sagaa doesn't just show your family's schedules—it understands them. Detect conflicts, optimize logistics, and coordinate everyone effortlessly.
              </p>
              <div style={{
                backgroundColor: '#fef3c7',
                borderRadius: '12px',
                padding: '20px',
                borderLeft: '4px solid #f59e0b'
              }}>
                <p style={{
                  fontSize: '15px',
                  color: '#92400e',
                  fontStyle: 'italic',
                  margin: 0,
                  lineHeight: '1.6'
                }}>
                  "Tommy's soccer tournament is Saturday 8 AM in Bellevue. Sarah mentioned taking him, but she also has her dentist appointment at 9 AM across town—this is a scheduling conflict. Options: (1) Reschedule Sarah's dentist to next Thursday 2 PM, or (2) Arrange carpool with Jake's family."
                </p>
              </div>
            </div>
            <div>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}>
                {[
                  { icon: '⚠️', title: 'Conflict Detection', desc: 'AI identifies scheduling impossibilities across family members' },
                  { icon: '🎯', title: 'Priority Understanding', desc: 'Learns what events matter most to each family member' },
                  { icon: '🚗', title: 'Logistics Optimization', desc: 'Groups errands and activities efficiently' },
                  { icon: '🔔', title: 'Smart Reminders', desc: 'Context-aware notifications (prep time, travel time, etc.)' },
                  { icon: '🤝', title: 'Shared Visibility', desc: 'Everyone sees what affects them, privacy respected' }
                ].map((feature, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    backgroundColor: '#fef9ec',
                    padding: '16px',
                    borderRadius: '12px',
                    border: '1px solid #fde68a'
                  }}>
                    <div style={{
                      fontSize: '24px',
                      flexShrink: 0
                    }}>
                      {feature.icon}
                    </div>
                    <div>
                      <div style={{
                        fontSize: '15px',
                        fontWeight: '600',
                        color: '#1d1d1f',
                        marginBottom: '4px'
                      }}>
                        {feature.title}
                      </div>
                      <div style={{
                        fontSize: '13px',
                        color: '#6b7280',
                        lineHeight: '1.4'
                      }}>
                        {feature.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Grid of Family Management Features */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '32px',
          marginBottom: '48px'
        }}>
          {/* Chore Management */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '32px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px'
            }}>
              <span style={{ fontSize: '28px' }}>✓</span>
            </div>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#1d1d1f',
              marginBottom: '12px'
            }}>
              Fair Chore Distribution
            </h3>
            <p style={{
              fontSize: '15px',
              color: '#6b7280',
              lineHeight: '1.6',
              marginBottom: '16px'
            }}>
              AI-powered chore assignment based on age, capability, schedule, and fairness—with accountability tracking.
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
              {[
                'Age-appropriate task assignment',
                'Schedule-aware distribution',
                'Completion tracking & reminders',
                'Fair rotation of undesirable tasks',
                'Reward system integration'
              ].map((item, idx) => (
                <li key={idx} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '8px',
                  marginBottom: '8px',
                  fontSize: '14px',
                  color: '#4b5563',
                  backgroundColor: 'transparent',
                  padding: 0
                }}>
                  <span style={{ color: '#8b5cf6', flexShrink: 0 }}>✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pet Care */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '32px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px'
            }}>
              <span style={{ fontSize: '28px' }}>🐕</span>
            </div>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#1d1d1f',
              marginBottom: '12px'
            }}>
              Complete Pet Care
            </h3>
            <p style={{
              fontSize: '15px',
              color: '#6b7280',
              lineHeight: '1.6',
              marginBottom: '16px'
            }}>
              Everything your pets need—vet visits, medications, grooming, food—automatically coordinated and never forgotten.
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
              {[
                'Vet appointment scheduling & reminders',
                'Medication tracking & refills',
                'Grooming appointment coordination',
                'Food & supply reordering',
                'Vaccination record management'
              ].map((item, idx) => (
                <li key={idx} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '8px',
                  marginBottom: '8px',
                  fontSize: '14px',
                  color: '#4b5563',
                  backgroundColor: 'transparent',
                  padding: 0
                }}>
                  <span style={{ color: '#ec4899', flexShrink: 0 }}>✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Child Activities */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '32px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px'
            }}>
              <span style={{ fontSize: '28px' }}>⚽</span>
            </div>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#1d1d1f',
              marginBottom: '12px'
            }}>
              Kids' Activity Management
            </h3>
            <p style={{
              fontSize: '15px',
              color: '#6b7280',
              lineHeight: '1.6',
              marginBottom: '16px'
            }}>
              Sports, school events, permission slips, carpools—all the complexity of kids' activities, simplified.
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
              {[
                'Sports schedule & game tracking',
                'School event calendar integration',
                'Permission slip & form reminders',
                'Carpool coordination with other families',
                'Equipment & supply tracking'
              ].map((item, idx) => (
                <li key={idx} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '8px',
                  marginBottom: '8px',
                  fontSize: '14px',
                  color: '#4b5563',
                  backgroundColor: 'transparent',
                  padding: 0
                }}>
                  <span style={{ color: '#06b6d4', flexShrink: 0 }}>✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Real-World Example */}
        <div style={{
          backgroundColor: '#ecfdf5',
          borderRadius: '16px',
          padding: '40px',
          border: '2px solid #10b981'
        }}>
          <h3 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#065f46',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <span style={{ fontSize: '32px' }}>🎯</span>
            Real-World Coordination Example
          </h3>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            borderLeft: '4px solid #10b981'
          }}>
            <p style={{
              fontSize: '16px',
              color: '#065f46',
              lineHeight: '1.7',
              fontStyle: 'italic',
              margin: 0
            }}>
              "Family coordination alert: Tommy's soccer tournament is Saturday 8 AM in Bellevue. Sarah has dentist 9 AM across town (conflict detected). Your mom's medication refill is due Thursday, and Bella's rabies vaccine expires next week. Here's the optimized plan: (1) Reschedule Sarah's dentist to Thursday 2 PM, (2) Pick up Mom's prescriptions Thursday after work, (3) Book Bella's vet appointment Thursday 3 PM (same area as Mom's pharmacy, saves you a trip). Total savings: 45 minutes of driving, zero conflicts."
            </p>
          </div>
          <div style={{
            marginTop: '20px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            {[
              'Conflict Resolution',
              'Logistics Optimization',
              'Time Savings',
              'Cross-Family Coordination'
            ].map((tag, idx) => (
              <div key={idx} style={{
                padding: '8px 16px',
                backgroundColor: '#d1fae5',
                borderRadius: '20px',
                fontSize: '13px',
                fontWeight: '600',
                color: '#065f46'
              }}>
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FamilyLifeCoordination;