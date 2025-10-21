// TypeScript types for Insights API

export interface RawInsight {
  expected_impact: string;
  full_content: string;
  why_matters: string;
  what_happening: string;
  type: string;
  priority: 'low' | 'medium' | 'high';
  title: string;
  actions: string[];
}

export interface Insight {
  summary: string;
  dismissed: boolean;
  raw_insight: RawInsight;
  status: 'active' | 'dismissed';
  priority: 'low' | 'medium' | 'high';
  expires_at: string;
  dismissed_at: string | null;
  insight_id: string;
  full_content: string;
  viewed_at: string | null;
  SK: string;
  insight_type: string;
  generated_at: string;
  viewed: boolean;
  PK: string;
  title: string;
  vertical?: string; // New attribute: sagaa_money, sagaa_healthcare, sagaa_education, sagaa_lifeessentials
}

export interface InsightsApiResponse {
  statusCode: number;
  headers: {
    'Content-Type': string;
    'Access-Control-Allow-Origin': string;
  };
  body: {
    insights: Insight[];
    count: number;
  };
}

// Config for mapping insight types to UI elements
export interface InsightTypeConfig {
  vertical: 'money' | 'healthcare' | 'education' | 'life';
  icon: any;
  gradient: string;
  bgGradient: string;
}
