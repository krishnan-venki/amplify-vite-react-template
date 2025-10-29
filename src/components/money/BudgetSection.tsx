import React from 'react';
import { TrendingUp, TrendingDown, AlertCircle, CheckCircle } from 'lucide-react';
import type { BudgetStatusResponse, CategoryBudget } from '../../types/finance';
import { formatCurrency, getBudgetStatusColor, getBudgetStatusText } from '../../types/finance';

interface BudgetSectionProps {
  data: BudgetStatusResponse;
  onCategoryClick?: (categoryId: string) => void;
  isMobile?: boolean;
}

interface BudgetProgressBarProps {
  percentageUsed: number;
  status: 'good' | 'warning' | 'over' | 'critical';
  showLabels?: boolean;
}

/**
 * Budget Progress Bar Component
 * Visual progress bar with color coding based on budget status
 */
export const BudgetProgressBar: React.FC<BudgetProgressBarProps> = ({
  percentageUsed,
  status,
  showLabels = false
}) => {
  const color = getBudgetStatusColor(status);
  const displayPercentage = Math.min(percentageUsed, 100); // Cap at 100% for visual

  return (
    <div style={{ width: '100%' }}>
      {showLabels && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '8px',
            fontSize: '12px',
            color: '#6b7280'
          }}
        >
          <span>{Math.round(percentageUsed)}% used</span>
          <span style={{ color }}>{getBudgetStatusText(status)}</span>
        </div>
      )}
      
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '8px',
          backgroundColor: '#e5e7eb',
          borderRadius: '999px',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            width: `${displayPercentage}%`,
            backgroundColor: color,
            borderRadius: '999px',
            transition: 'width 0.5s ease',
          }}
        />
      </div>
    </div>
  );
};

/**
 * Overall Budget Summary Card
 * Shows total budget vs spent with progress bar
 */
export const BudgetSummaryCard: React.FC<{
  overall: BudgetStatusResponse['overall'];
}> = ({ overall }) => {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    setShow(true);
  }, []);

  const statusColor = getBudgetStatusColor(overall.status);
  const StatusIcon = overall.status === 'good' ? CheckCircle : AlertCircle;

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '24px',
        border: '2px solid #e5e7eb',
        marginBottom: '24px',
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.5s ease'
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '20px'
        }}
      >
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: `${statusColor}15`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <StatusIcon size={24} style={{ color: statusColor }} />
        </div>
        <div>
          <h3
            style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#1f2937',
              marginBottom: '4px'
            }}
          >
            Overall Budget
          </h3>
          <div
            style={{
              fontSize: '14px',
              color: statusColor,
              fontWeight: '500'
            }}
          >
            {getBudgetStatusText(overall.status)}
          </div>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
          marginBottom: '20px'
        }}
      >
        <div>
          <div
            style={{
              fontSize: '12px',
              color: '#6b7280',
              marginBottom: '4px',
              fontWeight: '500'
            }}
          >
            BUDGET
          </div>
          <div
            style={{
              fontSize: '20px',
              fontWeight: '700',
              color: '#1f2937'
            }}
          >
            {formatCurrency(overall.total_budget)}
          </div>
        </div>

        <div>
          <div
            style={{
              fontSize: '12px',
              color: '#6b7280',
              marginBottom: '4px',
              fontWeight: '500'
            }}
          >
            SPENT
          </div>
          <div
            style={{
              fontSize: '20px',
              fontWeight: '700',
              color: statusColor
            }}
          >
            {formatCurrency(overall.total_spent)}
          </div>
        </div>

        <div>
          <div
            style={{
              fontSize: '12px',
              color: '#6b7280',
              marginBottom: '4px',
              fontWeight: '500'
            }}
          >
            REMAINING
          </div>
          <div
            style={{
              fontSize: '20px',
              fontWeight: '700',
              color: overall.total_remaining >= 0 ? '#10b981' : '#ef4444'
            }}
          >
            {formatCurrency(Math.abs(overall.total_remaining))}
          </div>
        </div>
      </div>

      <BudgetProgressBar
        percentageUsed={overall.percentage_used}
        status={overall.status}
        showLabels={true}
      />

      {overall.categories_over_budget > 0 && (
        <div
          style={{
            marginTop: '16px',
            padding: '12px',
            backgroundColor: '#fef2f2',
            borderRadius: '8px',
            border: '1px solid #fecaca',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '13px',
            color: '#dc2626'
          }}
        >
          <AlertCircle size={16} />
          <span>
            {overall.categories_over_budget} {overall.categories_over_budget === 1 ? 'category is' : 'categories are'} over budget
          </span>
        </div>
      )}
    </div>
  );
};

/**
 * Individual Category Budget Card
 * Shows single category budget details with progress bar
 */
export const CategoryBudgetCard: React.FC<{
  category: CategoryBudget;
  onClick?: () => void;
  delay?: number;
}> = ({ category, onClick, delay = 0 }) => {
  const [show, setShow] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const statusColor = getBudgetStatusColor(category.status);
  const Icon = category.percentage_used <= 100 ? TrendingDown : TrendingUp;

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '20px',
        border: `1px solid ${isHovered && onClick ? '#93c5fd' : '#e5e7eb'}`,
        cursor: onClick ? 'pointer' : 'default',
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.3s ease',
        transitionDelay: `${delay}ms`,
        boxShadow: isHovered && onClick ? '0 4px 12px rgba(147, 197, 253, 0.2)' : 'none'
      }}
    >
      {/* Category Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '16px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px'
            }}
          >
            {category.category_icon}
          </div>
          <div>
            <div
              style={{
                fontSize: '15px',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '2px'
              }}
            >
              {category.category_name}
            </div>
            <div
              style={{
                fontSize: '12px',
                color: '#6b7280'
              }}
            >
              {category.is_custom_budget ? 'Custom Budget' : 'System Budget'}
            </div>
          </div>
        </div>

        <div
          style={{
            padding: '4px 10px',
            borderRadius: '6px',
            backgroundColor: `${statusColor}15`,
            border: `1px solid ${statusColor}30`,
            fontSize: '11px',
            fontWeight: '600',
            color: statusColor,
            textTransform: 'uppercase'
          }}
        >
          {getBudgetStatusText(category.status)}
        </div>
      </div>

      {/* Budget vs Spent */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px',
          marginBottom: '16px'
        }}
      >
        <div>
          <div
            style={{
              fontSize: '11px',
              color: '#9ca3af',
              marginBottom: '4px',
              fontWeight: '500'
            }}
          >
            BUDGET
          </div>
          <div
            style={{
              fontSize: '18px',
              fontWeight: '700',
              color: '#1f2937'
            }}
          >
            {formatCurrency(category.budget_amount)}
          </div>
        </div>

        <div>
          <div
            style={{
              fontSize: '11px',
              color: '#9ca3af',
              marginBottom: '4px',
              fontWeight: '500'
            }}
          >
            SPENT
          </div>
          <div
            style={{
              fontSize: '18px',
              fontWeight: '700',
              color: statusColor
            }}
          >
            {formatCurrency(category.spent_amount)}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <BudgetProgressBar
        percentageUsed={category.percentage_used}
        status={category.status}
      />

      {/* Remaining/Over Amount */}
      <div
        style={{
          marginTop: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '13px'
        }}
      >
        <span style={{ color: '#6b7280' }}>
          {category.remaining_amount >= 0 ? 'Remaining' : 'Over Budget'}
        </span>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontWeight: '600',
            color: category.remaining_amount >= 0 ? '#10b981' : '#ef4444'
          }}
        >
          <Icon size={14} />
          <span>{formatCurrency(Math.abs(category.remaining_amount))}</span>
        </div>
      </div>
    </div>
  );
};

/**
 * Category Budget Grid
 * Grid of all category budget cards
 */
export const CategoryBudgetGrid: React.FC<{
  categories: CategoryBudget[];
  onCategoryClick?: (categoryId: string) => void;
  isMobile?: boolean;
}> = ({ categories, onCategoryClick, isMobile = false }) => {
  if (!categories || categories.length === 0) {
    return (
      <div
        style={{
          padding: '40px',
          textAlign: 'center',
          color: '#9ca3af'
        }}
      >
        No budget categories found
      </div>
    );
  }

  // Sort by percentage_used descending (highest usage first)
  const sortedCategories = [...categories].sort(
    (a, b) => b.percentage_used - a.percentage_used
  );

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: isMobile
          ? '1fr'
          : 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '16px'
      }}
    >
      {sortedCategories.map((category, index) => (
        <CategoryBudgetCard
          key={category.category_id}
          category={category}
          onClick={
            onCategoryClick
              ? () => onCategoryClick(category.category_id)
              : undefined
          }
          delay={index * 50}
        />
      ))}
    </div>
  );
};

/**
 * Main Budget Section Component
 * Combines overall summary and category grid
 */
export const BudgetSection: React.FC<BudgetSectionProps> = ({
  data,
  onCategoryClick,
  isMobile = false
}) => {
  return (
    <div style={{ marginBottom: '32px' }}>
      <h2
        style={{
          fontSize: '24px',
          fontWeight: '600',
          color: '#1f2937',
          marginBottom: '24px'
        }}
      >
        Budget Status
      </h2>

      <BudgetSummaryCard overall={data.overall} />

      <h3
        style={{
          fontSize: '18px',
          fontWeight: '600',
          color: '#1f2937',
          marginBottom: '16px'
        }}
      >
        Category Breakdown
      </h3>

      <CategoryBudgetGrid
        categories={data.categories}
        onCategoryClick={onCategoryClick}
        isMobile={isMobile}
      />

      {data.note && (
        <div
          style={{
            marginTop: '24px',
            padding: '16px',
            backgroundColor: '#eff6ff',
            borderRadius: '10px',
            border: '1px solid #93c5fd',
            fontSize: '14px',
            color: '#1e40af'
          }}
        >
          <strong>Note:</strong> {data.note}
        </div>
      )}
    </div>
  );
};
