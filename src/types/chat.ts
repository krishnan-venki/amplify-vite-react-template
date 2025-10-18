// Types for chat responses and chart data

export interface ChartData {
  type: 'bar';
  title?: string;
  xAxis: {
    label?: string;
    data: string[];
  };
  yAxis: {
    label?: string;
    data: number[];
  };
}

export interface SagaaResponse {
  response: string;           // Markdown text response
  chartable?: boolean;        // If true, show Dashboard tab
  chartData?: ChartData;
  hasInsights?: boolean;      // If true, show Insights tab
  insightsData?: any;         // Placeholder for future insights data
  hasImages?: boolean;        // If true, show Images tab
  imagesData?: string[];      // Array of image URLs
  hasSources?: boolean;       // If true, show Sources tab
  sourcesData?: Array<{       // Array of source references
    title: string;
    url?: string;
    type?: string;
  }>;
}

export interface ConversationMessage {
  role: 'user' | 'sagaa';
  text: string;
  chartable?: boolean;
  chartData?: ChartData;
  hasInsights?: boolean;
  insightsData?: any;
  hasImages?: boolean;
  imagesData?: string[];
  hasSources?: boolean;
  sourcesData?: Array<{
    title: string;
    url?: string;
    type?: string;
  }>;
}
