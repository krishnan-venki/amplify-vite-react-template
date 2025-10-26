import React from 'react';
import { useNavigate } from 'react-router-dom';
import LifeEssentialsCapabilities from './Lifeessentialscapabilities';
import PropertyAssetIntelligence from './Propertyassetintelligence';
import HouseholdOperations from './Householdoperations';
import FamilyLifeCoordination from './Familylifecoordination';
import DocumentsEmergencyPreparedness from './Documentsemergencypreparedness';
import { LifeEssentialsProactiveGuardian } from './LifeEssentialsProactiveGuardian';
import sagaaLogo from '../../assets/sagaa_48x48.png';
import heroImage from '../../assets/LifeEssentials_Hero_Image.png';
import AskSagaaEssentials from './AskSagaaEssentials';

const SagaaLifeEssentialsPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div style={{ 
      width: '100vw', 
      minHeight: '100vh', 
      backgroundColor: 'white', 
      position: 'absolute', 
      top: 0, 
      left: 0, 
      zIndex: 9999 
    }}>
      {/* Top Navigation Bar */}
      <nav style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 50,
        paddingTop: '24px',
        paddingBottom: '24px',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.07)',
        boxShadow: '0 2px 20px rgba(0, 0, 0, 0.07)',
        transition: 'all 0.3s ease'
      }}>
        <div style={{ 
          maxWidth: '1152px', 
          margin: '0 auto', 
          paddingLeft: '24px', 
          paddingRight: '24px' 
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center' 
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px' 
            }}>
              <img 
                src={sagaaLogo} 
                alt="Sagaa Logo" 
                style={{ width: '32px', height: '32px' }} 
              />
              <div style={{ 
                fontSize: '28px', 
                fontWeight: '700', 
                background: 'linear-gradient(135deg, #000000 0%, #333333 50%, #f59e0b 100%)', 
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent', 
                backgroundClip: 'text', 
                letterSpacing: '-0.5px', 
                fontFamily: 'system-ui, -apple-system, sans-serif' 
              }}>
                Sagaa Life Essentials
              </div>
            </div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '32px' 
            }}>
              <button
                style={{ 
                  color: 'black', 
                  fontSize: '14px', 
                  fontWeight: '500', 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer', 
                  transition: 'color 0.3s ease' 
                }}
                onClick={() => navigate('/')}
              >
                Home
              </button>
              <button 
                style={{ 
                  color: 'black', 
                  fontSize: '14px', 
                  fontWeight: '500', 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer', 
                  transition: 'color 0.3s ease' 
                }}
              >
                Features
              </button>
              <button 
                style={{ 
                  color: 'black', 
                  fontSize: '14px', 
                  fontWeight: '500', 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer', 
                  transition: 'color 0.3s ease' 
                }}
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" style={{
        padding: '28px 0 60px 0',
        background: 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 50%, #0284c7 100%)',
        color: 'white',
        marginTop: '24px'
      }}>
        <div style={{ 
          maxWidth: '1280px', 
          margin: '0 auto', 
          padding: '0 24px' 
        }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', 
            gap: '80px', 
            alignItems: 'center' 
          }}>
            <div>
              <h2 style={{ 
                fontWeight: '100', 
                color: 'white', 
                marginBottom: '32px', 
                lineHeight: '1.4', 
                wordBreak: 'break-word', 
                fontSize: 'clamp(48px, 5vw, 72px)', 
                paddingTop: '0.5em',
                maxWidth: '100%'
              }}>
                <span style={{ whiteSpace: 'nowrap' }}>
                  <span style={{ 
                    background: 'linear-gradient(135deg, #007AFF 0%, #00D2FF 50%, #34C759 100%)', 
                    WebkitBackgroundClip: 'text', 
                    WebkitTextFillColor: 'transparent', 
                    backgroundClip: 'text', 
                    color: 'transparent', 
                    display: 'inline-block', 
                    verticalAlign: 'baseline', 
                    lineHeight: 'inherit', 
                    paddingBottom: '0.18em' 
                  }}>
                    Sagaa Life Essentials
                  </span>
                </span>
                <br />
                <span>Your Essentials, intelligently managed</span>
              </h2>
              <p style={{ 
                fontSize: 'clamp(18px, 3vw, 28px)', 
                fontWeight: '100', 
                marginBottom: '48px', 
                color: '#fef3c7', 
                maxWidth: '100%', 
                margin: '0 auto 48px auto', 
                lineHeight: '1.6'
              }}>
                From properties and vehicles to family coordination and emergency preparedness—everything you need to manage your household intelligently, all in one platform with predictive insights and trusted community services
              </p>
            </div>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center' 
            }}>
              {/* Placeholder for hero image - you can replace with actual image */}
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <img src={heroImage} alt="Sagaa Life Essentials Hero" style={{ maxWidth: '100%', width: '760px', height: 'auto', borderRadius: '0', boxShadow: 'none', background: 'none', margin: 0, padding: 0, objectFit: 'contain', display: 'block' }} />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Capabilities Overview */}
      <LifeEssentialsCapabilities />
      
      {/* Ask Sagaa Section - Similar to Healthcare */}
      <AskSagaaEssentials />
      
      {/* Proactive Guardian Section */}
      <LifeEssentialsProactiveGuardian />
      
      {/* Detailed Capability Sections */}
      <PropertyAssetIntelligence />
      <HouseholdOperations />
      <FamilyLifeCoordination />
      <DocumentsEmergencyPreparedness />
      
    </div>
  );
};



export default SagaaLifeEssentialsPage;