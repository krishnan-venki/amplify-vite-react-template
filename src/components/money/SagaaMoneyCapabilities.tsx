import { useRef, useEffect, useState } from 'react';

export const FinanceCapabilities = () => {
  const [selectedCapability, setSelectedCapability] = useState<string | null>(null);
  const fadeInElementsRef = useRef<HTMLDivElement[]>([]);
  
  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !fadeInElementsRef.current.includes(el)) {
      fadeInElementsRef.current.push(el);
    }
  };

  useEffect(() => {
    fadeInElementsRef.current.forEach((el) => {
      if (el) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }
    });
  }, []);

  const handleCapabilityClick = (capabilityId: string) => {
    if (selectedCapability === capabilityId) {
      setSelectedCapability(null);
    } else {
      setSelectedCapability(capabilityId);
    }
  };

  const capabilities = {
    dashboard: {
      id: 'dashboard',
      icon: '📊',
      iconBg: '#d1fae5',
      title: 'Unified Financial Dashboard',
      shortDesc: 'All your accounts, investments, assets, and liabilities in one intelligent view',
      detailHeadline: 'Your Complete Financial Picture',
      detailText: 'Seamlessly integrates checking/savings accounts, credit cards, investment portfolios (stocks, bonds, ETFs, mutual funds, 401k, IRA), loans, mortgages, real estate, vehicles, and cryptocurrency. Real-time net worth tracking with asset allocation breakdown, trend analysis, and future projections. Includes household collaboration for partners/families, account reconciliation with error detection, and comprehensive exportable financial reports.',
      example: '"Your household net worth: $127,300 (+$8,400 this quarter). Breakdown: Cash $15K across 3 accounts, Investments $85K (401k $45K, Roth IRA $28K, Brokerage $12K - portfolio: 68% stocks, 22% bonds, 10% cash), Home equity $65K, Car $18K, minus Debts $55,800. Sarah\'s contribution this month: $1,240. Combined, you\'re on track to hit $150K by year-end."',
      showExample: true
    },
    expenseTracking: {
      id: 'expenseTracking',
      icon: '🔍',
      iconBg: '#dbeafe',
      title: 'Smart Expense Tracking & Insights',
      shortDesc: 'AI that understands not just what you spend, but why',
      detailHeadline: 'Beyond Transactions—True Understanding',
      detailText: 'Automatic transaction categorization with 95% accuracy, behavioral pattern recognition, spending trigger identification, location-based insights, and anomaly detection. Custom rules engine for if-then categorization, automatic merchant name cleanup, split transaction handling, and tax category tagging for deductions. Manual reconciliation tools with AI assistance.',
      example: '"You spent $340 on dining this month vs usual $280. I noticed 80% of overspending happens within 2 miles of your office on stressful workdays (Chipotle x4, Starbucks x8). Your calendar shows 3 big presentations this month—that explains the pattern. I\'ve auto-tagged your home office supplies ($127) as tax-deductible. Also, I cleaned up \'AMZN MKTPLACE\' transactions into proper categories: Office Supplies, Books, Household."',
      showExample: true
    },
    budgetManagement: {
      id: 'budgetManagement',
      icon: '🎯',
      iconBg: '#fef3c7',
      title: 'Dynamic Budget Management',
      shortDesc: 'Budgets that breathe with your life, powered by your spending insights',
      detailHeadline: 'Adaptive Budgeting Intelligence',
      detailText: 'AI-powered budgeting using your expense patterns, multiple methodology support (zero-based/YNAB style, envelope method, percentage-based, or flexible). Adaptive to life changes, real-time monitoring with predictive adjustments, smart reallocation suggestions, and shared household budgets with partner visibility. "Age of money" tracking and budget performance analytics.',
      example: '"Your grocery spending ($420) is 30% over budget, but dining out is $120 under. I see you\'ve been meal prepping (detected via Sunday grocery trips + reduced weekday restaurant visits). Should I reallocate $50/month from dining to groceries to reflect your new healthy habit? This keeps your food budget balanced at $700 total. Your \'age of money\' is 23 days—up from 12 days three months ago, meaning you\'re living less paycheck-to-paycheck."',
      showExample: true
    },
    cashFlow: {
      id: 'cashFlow',
      icon: '🔮',
      iconBg: '#e0e7ff',
      title: 'Predictive Cash Flow & Alerts',
      shortDesc: 'See tomorrow\'s financial reality today',
      detailHeadline: 'Financial Foresight',
      detailText: 'AI forecasting of income and expenses based on patterns, upcoming bills, irregular income smoothing, and seasonal pattern recognition. Early warnings about potential shortfalls, bill due date alerts, paycheck timing optimization, and scenario planning. Accounts for variable income (freelancers/gig workers) with confidence intervals.',
      example: '"Cash flow alert: Your car insurance ($180), annual Amazon Prime ($139), and quarterly water bill ($87) all hit between June 15-20. Your checking will drop to $340 after these bills and regular expenses. I can: (1) Move $250 from savings on June 14th, (2) Delay gym membership charge ($65) by one week, or (3) You have a client payment ($850) expected June 18th—but it\'s historically 3-5 days late. Recommend option 1 for safety."',
      showExample: true
    },
    debtElimination: {
      id: 'debtElimination',
      icon: '💳',
      iconBg: '#fce7f3',
      title: 'Intelligent Debt Elimination',
      shortDesc: 'Personalized strategies to become debt-free faster',
      detailHeadline: 'Your Path to Financial Freedom',
      detailText: 'AI-optimized debt reduction combining avalanche (highest interest) and snowball (smallest balance) methods based on your psychology and math. Refinancing alerts when better rates available, consolidation analysis, balance transfer opportunity identification, and motivational progress tracking with debt-free date projections. Integration with credit score monitoring to show improvement impact.',
      example: '"Your student loan rate is 6.8% ($42K remaining). I found refinancing at 4.2%, saving $4,300 over remaining 4 years. Your credit score (740) qualifies you. Based on your payment history, you respond well to quick wins—but this is your biggest mathematical win available. Refinancing + current payment pace = debt-free by March 2028 (vs July 2029). Once you eliminate your car loan ($13,800 at 5.9%, 18 months left), I\'ll redirect that $380/month to student loans, moving your debt-free date to November 2027. That\'s 20 months faster."',
      showExample: true
    },
    savingsInvestment: {
      id: 'savingsInvestment',
      icon: '📈',
      iconBg: '#dbeafe',
      title: 'Goal-Driven Savings & Investment',
      shortDesc: 'Every dollar working toward what matters most to you',
      detailHeadline: 'Wealth Building on Autopilot',
      detailText: 'Goal-specific savings strategies with automated transfers and micro-savings, investment recommendations based on risk tolerance and timeline, portfolio rebalancing alerts, investment fee analysis, tax-advantaged account optimization (401k, IRA, HSA, 529), retirement planning with projections, and tax-loss harvesting opportunities. Includes asset allocation guidance and diversification scoring.',
      example: '"Your emergency fund is complete ($10K ✓). Redirecting that $400/month to investments. Your current portfolio: 85% stocks is aggressive for age 45 with moderate risk tolerance. Users in your risk profile with 70/30 stocks/bonds achieve similar long-term returns (6.8% vs 7.1%) with 40% less volatility. Rebalancing recommendation: Sell $12,750 from S&P 500 index → Move to bond index fund. Your 401(k) ($45K) + IRA ($28K) + new $400/month contributions + employer match projects to $890K at age 65 (7% return assumption). You\'re on track to replace 75% of current income in retirement."',
      showExample: true
    },
    taxOptimization: {
      id: 'taxOptimization',
      icon: '📋',
      iconBg: '#fed7aa',
      title: 'Tax Optimization & Planning',
      shortDesc: 'Year-round tax intelligence that puts more money in your pocket',
      detailHeadline: 'Smart Tax Strategy',
      detailText: 'Automated tax-deductible expense tracking, estimated quarterly tax calculations for self-employed, tax-loss harvesting alerts, retirement contribution optimization for tax benefits, HSA/FSA maximization, charitable giving optimization, and tax document organization. End-of-year tax planning with proactive strategies.',
      example: '"Tax optimization alert: You\'re in the 24% bracket. Three moves before Dec 31st save $1,442: (1) Harvest $3,000 capital losses (saves $720), (2) Max your IRA—add $2,000 more (saves $480), (3) Home office deduction: I\'ve tracked $8,400 eligible expenses = $242 savings. Want me to prepare the documentation?"',
      showExample: true
    },
    billOptimization: {
      id: 'billOptimization',
      icon: '💰',
      iconBg: '#fef3c7',
      title: 'Bill & Subscription Optimization',
      shortDesc: 'Automatic monitoring ensures you never overpay for anything',
      detailHeadline: 'Stop the Money Leaks',
      detailText: 'Tracks all recurring payments across credit cards and bank accounts, identifies unused or underutilized subscriptions, finds better rates for insurance/internet/phone, monitors promotional pricing expirations, connects you with negotiation experts from our community marketplace, and optimizes payment timing for rewards maximization and cash flow. Contract expiration tracking with 60-day advance notices.',
      example: '"Found 6 optimization opportunities totaling $1,140/year: (1) Spotify Premium unused 3 months—cancel saves $120/year, (2) Car insurance renewal next month—I got quotes: Geico $89/month (current: $127), switching saves $456/year, (3) Internet promo expires July 1st (jumps from $49.99 to $79.99)—Competitor offers 500mbps for $44.99 vs your current 300mbps, (4) Credit card annual fee ($95) posting next week—Capital One Quicksilver (no fee, 1.5% cash back) actually earns you more. Want me to connect you with Bill, a community member who negotiated his Comcast rate down 40%?"',
      showExample: true
    }
  };

  const leftCapabilities = [
    capabilities.dashboard,
    capabilities.expenseTracking,
    capabilities.budgetManagement,
    capabilities.cashFlow
  ];

  const rightCapabilities = [
    capabilities.debtElimination,
    capabilities.savingsInvestment,
    capabilities.taxOptimization,
    capabilities.billOptimization
  ];

  type Capability = {
    id: string;
    icon: string;
    iconBg: string;
    title: string;
    shortDesc: string;
    detailHeadline: string;
    detailText: string;
    example?: string;
    showExample?: boolean;
  };

  interface CapabilityCardProps {
    capability: Capability;
    isSelected: boolean;
  }

  const CapabilityCard = ({ capability, isSelected }: CapabilityCardProps) => {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
      <div 
        onClick={() => handleCapabilityClick(capability.id)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ 
          display: 'flex', 
          alignItems: 'flex-start', 
          gap: '16px',
          cursor: 'pointer',
          padding: '12px',
          borderRadius: '12px',
          transition: 'all 0.3s ease',
          backgroundColor: isSelected || isHovered ? '#f0fdf4' : 'transparent',
          border: isSelected ? '2px solid #10b981' : isHovered ? '2px solid #6ee7b7' : '2px solid transparent',
          opacity: selectedCapability && !isSelected ? 0.4 : 1
        }}
      >
        <div style={{
          width: '48px',
          height: '48px',
          backgroundColor: capability.iconBg,
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          transform: isSelected || isHovered ? 'scale(1.1)' : 'scale(1)',
          transition: 'transform 0.3s ease'
        }}>
          <span style={{ fontSize: '32px' }}>{capability.icon}</span>
        </div>
        <div>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '500',
            color: '#1d1d1f',
            marginBottom: '8px'
          }}>{capability.title}</h3>
          <p style={{ 
            color: '#6e6e73',
            fontSize: '15px',
            lineHeight: '1.5',
            margin: 0
          }}>{capability.shortDesc}</p>
        </div>
      </div>
    );
  };

  const FinanceVisual = () => (
    <div style={{
      position: 'relative',
      width: '320px',
      height: '320px',
      opacity: selectedCapability ? 0 : 1,
      transform: selectedCapability ? 'scale(0.8)' : 'scale(1)',
      transition: 'all 0.6s ease',
      pointerEvents: selectedCapability ? 'none' : 'auto'
    }}>
      <svg width="320" height="320" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', zIndex: 0 }}>
        <line x1="160" y1="160" x2="240" y2="80" stroke="#10b981" strokeWidth="2" opacity="0.25">
          <animate attributeName="opacity" values="0.15;0.4;0.15" dur="2.5s" repeatCount="indefinite" />
        </line>
        <line x1="160" y1="160" x2="264" y2="200" stroke="#059669" strokeWidth="2" opacity="0.25">
          <animate attributeName="opacity" values="0.15;0.4;0.15" dur="2.2s" repeatCount="indefinite" />
        </line>
        <line x1="160" y1="160" x2="80" y2="264" stroke="#34d399" strokeWidth="2" opacity="0.25">
          <animate attributeName="opacity" values="0.15;0.4;0.15" dur="2.7s" repeatCount="indefinite" />
        </line>
        <line x1="160" y1="160" x2="40" y2="120" stroke="#10b981" strokeWidth="2" opacity="0.25">
          <animate attributeName="opacity" values="0.15;0.4;0.15" dur="2.3s" repeatCount="indefinite" />
        </line>
        <line x1="160" y1="160" x2="120" y2="32" stroke="#059669" strokeWidth="2" opacity="0.25">
          <animate attributeName="opacity" values="0.15;0.4;0.15" dur="2.6s" repeatCount="indefinite" />
        </line>
        <line x1="160" y1="160" x2="200" y2="280" stroke="#34d399" strokeWidth="2" opacity="0.25">
          <animate attributeName="opacity" values="0.15;0.4;0.15" dur="2.4s" repeatCount="indefinite" />
        </line>
      </svg>
      
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80px',
        height: '80px',
        background: 'linear-gradient(135deg, #065f46 0%, #059669 50%, #10b981 100%)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 8px 32px rgba(16, 185, 129, 0.3)',
        zIndex: 2
      }}>
        <span style={{ color: 'white', fontSize: '40px' }}>💰</span>
      </div>
      
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '200px',
        height: '200px',
        border: '1px solid #a7f3d0',
        borderRadius: '50%',
        opacity: 0.3
      }} />
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '240px',
        height: '240px',
        border: '1px solid #a7f3d0',
        borderRadius: '50%',
        opacity: 0.2
      }} />
      
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '0',
        height: '0'
      }}>
        <div style={{
          position: 'absolute',
          width: '48px',
          height: '48px',
          backgroundColor: '#d1fae5',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          left: '-24px',
          top: '-24px',
          animation: 'orbit1 20s linear infinite'
        }}>
          <span style={{ fontSize: '20px' }}>📊</span>
        </div>
        
        <div style={{
          position: 'absolute',
          width: '48px',
          height: '48px',
          backgroundColor: '#dbeafe',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          left: '-24px',
          top: '-24px',
          animation: 'orbit2 20s linear infinite'
        }}>
          <span style={{ fontSize: '20px' }}>🔍</span>
        </div>
        
        <div style={{
          position: 'absolute',
          width: '48px',
          height: '48px',
          backgroundColor: '#fef3c7',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          left: '-24px',
          top: '-24px',
          animation: 'orbit3 20s linear infinite'
        }}>
          <span style={{ fontSize: '20px' }}>🎯</span>
        </div>
        
        <div style={{
          position: 'absolute',
          width: '48px',
          height: '48px',
          backgroundColor: '#e0e7ff',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          left: '-24px',
          top: '-24px',
          animation: 'orbit4 20s linear infinite'
        }}>
          <span style={{ fontSize: '20px' }}>🔮</span>
        </div>
        
        <div style={{
          position: 'absolute',
          width: '48px',
          height: '48px',
          backgroundColor: '#fce7f3',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          left: '-24px',
          top: '-24px',
          animation: 'orbit5 20s linear infinite'
        }}>
          <span style={{ fontSize: '20px' }}>💳</span>
        </div>
        
        <div style={{
          position: 'absolute',
          width: '48px',
          height: '48px',
          backgroundColor: '#dbeafe',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          left: '-24px',
          top: '-24px',
          animation: 'orbit6 20s linear infinite'
        }}>
          <span style={{ fontSize: '20px' }}>📈</span>
        </div>
        
        <div style={{
          position: 'absolute',
          width: '48px',
          height: '48px',
          backgroundColor: '#fed7aa',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          left: '-24px',
          top: '-24px',
          animation: 'orbit7 20s linear infinite'
        }}>
          <span style={{ fontSize: '20px' }}>📋</span>
        </div>
        
        <div style={{
          position: 'absolute',
          width: '48px',
          height: '48px',
          backgroundColor: '#fef3c7',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          left: '-24px',
          top: '-24px',
          animation: 'orbit8 20s linear infinite'
        }}>
          <span style={{ fontSize: '20px' }}>💰</span>
        </div>
      </div>

      <style>{`
        @keyframes orbit1 {
          from { transform: rotate(0deg) translateX(100px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(100px) rotate(-360deg); }
        }
        @keyframes orbit2 {
          from { transform: rotate(45deg) translateX(100px) rotate(-45deg); }
          to { transform: rotate(405deg) translateX(100px) rotate(-405deg); }
        }
        @keyframes orbit3 {
          from { transform: rotate(90deg) translateX(100px) rotate(-90deg); }
          to { transform: rotate(450deg) translateX(100px) rotate(-450deg); }
        }
        @keyframes orbit4 {
          from { transform: rotate(135deg) translateX(100px) rotate(-135deg); }
          to { transform: rotate(495deg) translateX(100px) rotate(-495deg); }
        }
        @keyframes orbit5 {
          from { transform: rotate(180deg) translateX(100px) rotate(-180deg); }
          to { transform: rotate(540deg) translateX(100px) rotate(-540deg); }
        }
        @keyframes orbit6 {
          from { transform: rotate(225deg) translateX(100px) rotate(-225deg); }
          to { transform: rotate(585deg) translateX(100px) rotate(-585deg); }
        }
        @keyframes orbit7 {
          from { transform: rotate(270deg) translateX(100px) rotate(-270deg); }
          to { transform: rotate(630deg) translateX(100px) rotate(-630deg); }
        }
        @keyframes orbit8 {
          from { transform: rotate(315deg) translateX(100px) rotate(-315deg); }
          to { transform: rotate(675deg) translateX(100px) rotate(-675deg); }
        }
      `}</style>
    </div>
  );

  const CapabilityDetail = () => {
    if (!selectedCapability) return null;
    const capability = capabilities[selectedCapability as keyof typeof capabilities];
    
    if (!capability) return null;

    return (
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        maxWidth: '480px',
        opacity: selectedCapability ? 1 : 0,
        transition: 'all 0.6s ease',
        pointerEvents: selectedCapability ? 'auto' : 'none'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%)',
          borderRadius: '24px',
          padding: '40px',
          boxShadow: '0 20px 60px rgba(16, 185, 129, 0.4)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          position: 'relative'
        }}>
          <button
            onClick={() => setSelectedCapability(null)}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: 'rgba(255, 255, 255, 0.95)',
              fontSize: '18px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
              padding: 0
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            }}
          >
            ✕
          </button>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '24px'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
            }}>
              <span style={{ fontSize: '36px' }}>{capability.icon}</span>
            </div>
            <div>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '600',
                color: '#ffffff',
                margin: 0
              }}>{capability.detailHeadline}</h3>
            </div>
          </div>

          <p style={{
            fontSize: '16px',
            lineHeight: '1.6',
            color: 'rgba(255, 255, 255, 0.9)',
            marginBottom: '20px'
          }}>
            {capability.detailText}
          </p>

          {capability.showExample && capability.example && (
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              padding: '16px',
              borderLeft: '3px solid rgba(255, 255, 255, 0.4)'
            }}>
              <p style={{
                fontSize: '14px',
                color: 'rgba(255, 255, 255, 0.85)',
                fontStyle: 'italic',
                margin: 0
              }}>
                {capability.example}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <section style={{
      padding: '60px 0',
      backgroundColor: 'white'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 24px'
      }}>
        <div ref={addToRefs} style={{ 
          textAlign: 'center', 
          marginBottom: '80px',
          opacity: 0,
          transform: 'translateY(20px)',
          transition: 'all 0.8s ease-out'
        }}>
          <h2 style={{
            fontSize: 'clamp(48px, 5vw, 60px)',
            fontWeight: '100',
            color: '#1d1d1f',
            marginBottom: '32px',
            lineHeight: '1.1',
            textAlign: 'center',
            maxWidth: '900px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            <span style={{ 
              color: '#1d1d1f',
              backgroundColor: 'transparent'
            }}>Your Money.</span>{' '}
            <span style={{
              background: 'linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent'
            }}>One Platform.</span>
          </h2>
          <p style={{
            fontSize: '22px',
            color: '#6b7280',
            maxWidth: '1024px',
            margin: '0 auto',
            lineHeight: '1.7',
            fontWeight: '300'
          }}>
            From net worth tracking to intelligent budgeting, debt elimination to investment guidance—everything you need to master your finances, all intelligently connected.
          </p>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'stretch',
          gap: '40px',
          flexWrap: 'wrap'
        }}>
          <div ref={addToRefs} style={{ 
            flex: '1 1 320px', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '16px', 
            justifyContent: 'center',
            opacity: 0,
            transform: 'translateY(20px)',
            transition: 'all 0.8s ease-out 0.2s'
          }}>
            {leftCapabilities.map(capability => (
              <CapabilityCard 
                key={capability.id} 
                capability={capability} 
                isSelected={selectedCapability === capability.id}
              />
            ))}
          </div>

          <div ref={addToRefs} style={{ 
            flex: '0 1 400px', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            minWidth: '340px',
            minHeight: '480px',
            position: 'relative',
            opacity: 0,
            transform: 'translateY(20px)',
            transition: 'all 0.8s ease-out 0.4s'
          }}>
            <FinanceVisual />
            <CapabilityDetail />
            
            {!selectedCapability && (
              <div style={{ 
                textAlign: 'center', 
                marginTop: '32px',
                opacity: 1,
                transition: 'opacity 0.3s ease'
              }}>
                <p style={{ 
                  color: '#6e6e73', 
                  fontSize: '14px',
                  marginBottom: '8px'
                }}>Your finances, intelligently managed</p>
                <p style={{ 
                  color: '#9ca3af', 
                  fontSize: '13px',
                  fontStyle: 'italic'
                }}>Click any capability to explore</p>
              </div>
            )}
          </div>

          <div ref={addToRefs} style={{ 
            flex: '1 1 320px', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '16px', 
            justifyContent: 'center',
            opacity: 0,
            transform: 'translateY(20px)',
            transition: 'all 0.8s ease-out 0.6s'
          }}>
            {rightCapabilities.map(capability => (
              <CapabilityCard 
                key={capability.id} 
                capability={capability} 
                isSelected={selectedCapability === capability.id}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinanceCapabilities;
          