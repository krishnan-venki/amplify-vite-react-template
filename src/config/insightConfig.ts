import { 
  DollarSign, 
  Heart,
  GraduationCap,
  Home as HomeIcon
} from 'lucide-react';
import type { InsightTypeConfig } from '../types/insight';

// Map vertical values to UI configurations
// This matches the exact colors used in Dashboard verticals
export const VERTICAL_CONFIG: Record<string, InsightTypeConfig> = {
  'sagaa_money': {
    vertical: 'money',
    icon: DollarSign,
    gradient: 'linear-gradient(135deg, #10b981 0%, #0d9488 100%)',  // Money green
    bgGradient: 'linear-gradient(135deg, #ecfdf5 0%, #f0fdfa 100%)'  // Light green
  },
  'sagaa_healthcare': {
    vertical: 'healthcare',
    icon: Heart,
    gradient: 'linear-gradient(135deg, #f43f5e 0%, #ec4899 100%)',  // Healthcare pink/red
    bgGradient: 'linear-gradient(135deg, #fef2f2 0%, #fdf2f8 100%)'  // Light pink
  },
  'sagaa_education': {
    vertical: 'education',
    icon: GraduationCap,
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',  // Education blue
    bgGradient: 'linear-gradient(135deg, #eff6ff 0%, #eef2ff 100%)'  // Light blue
  },
  'sagaa_lifeessentials': {
    vertical: 'life',
    icon: HomeIcon,
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',  // Life essentials orange
    bgGradient: 'linear-gradient(135deg, #fffbeb 0%, #fff7ed 100%)'  // Light orange
  }
};

// Default config for unknown verticals (fallback to money)
export const DEFAULT_INSIGHT_CONFIG: InsightTypeConfig = {
  vertical: 'money',
  icon: DollarSign,
  gradient: 'linear-gradient(135deg, #10b981 0%, #0d9488 100%)',
  bgGradient: 'linear-gradient(135deg, #ecfdf5 0%, #f0fdfa 100%)'
};

// Get config based on vertical attribute from API
export function getInsightConfig(vertical?: string): InsightTypeConfig {
  if (!vertical) {
    return DEFAULT_INSIGHT_CONFIG;
  }
  return VERTICAL_CONFIG[vertical] || DEFAULT_INSIGHT_CONFIG;
}
