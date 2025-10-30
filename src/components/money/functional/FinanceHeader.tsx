import React from 'react';
import { Calendar, MessageCircle } from 'lucide-react';
import { getCurrentMonth, formatMonth } from '../../../types/finance';

interface MonthNavigatorProps {
  selectedMonth: string;
  onMonthChange: (month: string) => void;
  isMobile?: boolean;
  variant?: 'hero' | 'filterBar'; // New prop for styling variant
}

/**
 * Month Navigator Component
 * Allows user to navigate between months
 */
export const MonthNavigator: React.FC<MonthNavigatorProps> = ({
  selectedMonth,
  onMonthChange,
  variant = 'filterBar'
}) => {
  const [showDropdown, setShowDropdown] = React.useState(false);

  // Generate last 12 months for dropdown
  const monthOptions = React.useMemo(() => {
    const months: string[] = [];
    const now = new Date();
    for (let i = 0; i < 12; i++) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push(date.toISOString().slice(0, 7)); // "YYYY-MM"
    }
    return months;
  }, []);

  const handlePreviousMonth = () => {
    const [year, month] = selectedMonth.split('-').map(Number);
    const prevDate = new Date(year, month - 2, 1); // month - 2 because month is 1-indexed
    const prevMonth = prevDate.toISOString().slice(0, 7);
    onMonthChange(prevMonth);
  };

  const handleNextMonth = () => {
    const [year, month] = selectedMonth.split('-').map(Number);
    const nextDate = new Date(year, month, 1); // month is already 1-indexed
    const nextMonth = nextDate.toISOString().slice(0, 7);
    const currentMonth = getCurrentMonth();
    
    // Don't allow future months
    if (nextMonth <= currentMonth) {
      onMonthChange(nextMonth);
    }
  };

  const canGoNext = () => {
    const [year, month] = selectedMonth.split('-').map(Number);
    const nextDate = new Date(year, month, 1);
    const nextMonth = nextDate.toISOString().slice(0, 7);
    const currentMonth = getCurrentMonth();
    return nextMonth <= currentMonth;
  };

  // Styling based on variant
  const isHero = variant === 'hero';
  const buttonBorder = isHero ? 'rgba(255, 255, 255, 0.5)' : '#d1d5db';
  const buttonBg = isHero ? 'rgba(255, 255, 255, 0.2)' : '#ffffff';
  const buttonHoverBg = isHero ? 'rgba(255, 255, 255, 0.3)' : '#f3f4f6';
  const iconColor = isHero ? '#ffffff' : '#6b7280';
  const textColor = isHero ? '#ffffff' : '#1f2937';

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0px',
        flexShrink: 0,
        backgroundColor: buttonBg,
        borderRadius: '6px',
        overflow: 'visible',
        width: 'fit-content',
        position: 'relative',
      }}
    >
      {/* Previous Month Button - Integrated */}
      <button
        onClick={handlePreviousMonth}
        title="Previous month"
        aria-label="Previous month"
        style={{
          width: '32px',
          height: '32px',
          border: 'none',
          backgroundColor: 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          flexShrink: 0,
          fontSize: '12px',
          fontWeight: 'bold',
          color: iconColor,
          borderRight: `1px solid ${buttonBorder}`,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = buttonHoverBg;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        ◀
      </button>

      {/* Current Month Display / Dropdown */}
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 10px',
            height: '32px',
            border: 'none',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: '600',
            color: textColor,
            transition: 'all 0.2s ease',
            minWidth: '180px',
            justifyContent: 'center',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = buttonHoverBg;
          }}
          onMouseLeave={(e) => {
            if (!showDropdown) {
              e.currentTarget.style.backgroundColor = 'transparent';
            }
          }}
        >
          <Calendar size={14} strokeWidth={2.5} color={iconColor} />
          <span>{formatMonth(selectedMonth)}</span>
          <span
            style={{
              fontSize: '10px',
              transform: showDropdown ? 'rotate(90deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease',
              display: 'inline-block',
            }}
          >
            ▼
          </span>
        </button>

        {/* Dropdown Menu */}
        {showDropdown && (
          <>
            {/* Backdrop */}
            <div
              onClick={() => setShowDropdown(false)}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 999
              }}
            />
            {/* Dropdown */}
            <div
              style={{
                position: 'absolute',
                top: '48px',
                left: 0,
                minWidth: '200px',
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                maxHeight: '300px',
                overflowY: 'auto',
                zIndex: 1000
              }}
            >
              {monthOptions.map((month) => (
                <button
                  key={month}
                  onClick={() => {
                    onMonthChange(month);
                    setShowDropdown(false);
                  }}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    textAlign: 'left',
                    border: 'none',
                    backgroundColor: month === selectedMonth ? '#eff6ff' : '#ffffff',
                    color: month === selectedMonth ? '#0369a1' : '#1f2937',
                    fontWeight: month === selectedMonth ? '600' : '400',
                    fontSize: '14px',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (month !== selectedMonth) {
                      e.currentTarget.style.backgroundColor = '#f9fafb';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (month !== selectedMonth) {
                      e.currentTarget.style.backgroundColor = '#ffffff';
                    }
                  }}
                >
                  {formatMonth(month)}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Next Month Button - Integrated */}
      <button
        onClick={handleNextMonth}
        disabled={!canGoNext()}
        title={canGoNext() ? "Next month" : "Cannot go to future months"}
        aria-label="Next month"
        style={{
          width: '32px',
          height: '32px',
          border: 'none',
          backgroundColor: 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: canGoNext() ? 'pointer' : 'not-allowed',
          opacity: canGoNext() ? 1 : 0.5,
          transition: 'all 0.2s ease',
          flexShrink: 0,
          fontSize: '12px',
          fontWeight: 'bold',
          color: iconColor,
          borderLeft: `1px solid ${buttonBorder}`,
        }}
        onMouseEnter={(e) => {
          if (canGoNext()) {
            e.currentTarget.style.backgroundColor = buttonHoverBg;
          }
        }}
        onMouseLeave={(e) => {
          if (canGoNext()) {
            e.currentTarget.style.backgroundColor = 'transparent';
          }
        }}
      >
        ▶
      </button>
    </div>
  );
};

/**
 * Finance Header Component
 * Hero header - clean version without month navigation
 */
export const FinanceHeader: React.FC<{ isMobile?: boolean }> = ({ isMobile = false }) => {
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 50%, #0284c7 100%)',
        padding: isMobile ? '24px 16px' : '32px 48px',
        color: 'white',
        position: 'relative',
        overflow: 'visible'
      }}
    >
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1400px',
          margin: '0 auto'
        }}
      >
        {/* Title Section */}
        <div>
          <h1
            style={{
              fontSize: isMobile ? '28px' : '36px',
              fontWeight: '600',
              marginBottom: '8px',
              lineHeight: '1.4',
              color: 'white'
            }}
          >
            💰 Sagaa Money
          </h1>
          <p
            style={{
              fontSize: isMobile ? '14px' : '16px',
              color: '#d1d5db',
              marginBottom: '0'
            }}
          >
            Track spending, manage budgets, and monitor financial health
          </p>
        </div>
      </div>

      {/* Decorative Background Elements */}
      <div
        style={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-30px',
          left: '-30px',
          width: '150px',
          height: '150px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />
    </div>
  );
};

/**
 * FilterBar Component
 * Sticky top bar with title, month navigator, and action buttons
 */
export const FilterBar: React.FC<MonthNavigatorProps> = ({
  selectedMonth,
  onMonthChange,
  isMobile = false
}) => {
  const [showAskSagaa, setShowAskSagaa] = React.useState(false);

  const handleDownload = () => {
    // TODO: Implement download functionality
    console.log('Download clicked');
    alert('Download functionality coming soon!');
  };

  const handleShare = () => {
    // TODO: Implement share functionality
    console.log('Share clicked');
    alert('Share functionality coming soon!');
  };

  return (
    <div
      style={{
        marginBottom: '24px',
        paddingLeft: '16px',
        paddingRight: '16px',
      }}
    >
      {/* Layout: Title + Month Navigator on left, Action buttons on right */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '16px',
        }}
      >
        {/* Left Side: Title + Month Navigator */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* Title */}
          <div
            style={{
              fontSize: isMobile ? '18px' : '20px',
              color: '#1f2937',
              fontWeight: '700',
            }}
          >
            Money Flow
          </div>

          {/* Month Navigator */}
          <div style={{ position: 'relative' }}>
            <MonthNavigator
              selectedMonth={selectedMonth}
              onMonthChange={onMonthChange}
              isMobile={isMobile}
              variant="filterBar"
            />
          </div>
        </div>

        {/* Right Side: Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Ask Sagaa Button */}
          <button
            onClick={() => setShowAskSagaa(!showAskSagaa)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: isMobile ? '6px 12px' : '8px 14px',
              backgroundColor: '#eff6ff',
              color: '#0369a1',
              border: '1px solid #bfdbfe',
              borderRadius: '6px',
              fontSize: isMobile ? '12px' : '13px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#dbeafe';
              e.currentTarget.style.borderColor = '#93c5fd';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#eff6ff';
              e.currentTarget.style.borderColor = '#bfdbfe';
            }}
          >
            <MessageCircle size={14} strokeWidth={2.5} />
            {!isMobile && <span>Ask Sagaa</span>}
          </button>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            title="Download report"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px',
              backgroundColor: '#f9fafb',
              color: '#6b7280',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              fontSize: '18px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f3f4f6';
              e.currentTarget.style.borderColor = '#9ca3af';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f9fafb';
              e.currentTarget.style.borderColor = '#d1d5db';
            }}
          >
            ⬇
          </button>

          {/* Share Button */}
          <button
            onClick={handleShare}
            title="Share"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px',
              backgroundColor: '#f9fafb',
              color: '#6b7280',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              fontSize: '18px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f3f4f6';
              e.currentTarget.style.borderColor = '#9ca3af';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f9fafb';
              e.currentTarget.style.borderColor = '#d1d5db';
            }}
          >
            📤
          </button>
        </div>
      </div>
    </div>
  );
};
