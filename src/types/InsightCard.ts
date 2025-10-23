export type Priority = "HIGH" | "MEDIUM" | "LOW";
export type Confidence = "LOW" | "MEDIUM" | "HIGH";
export type ChartType =
  | "donut"
  | "bar"
  | "line"
  | "area"
  | "stackedBar"
  | "bullet"
  | "waterfall";

export interface InsightCardV1 {
  id: string;
  type: string;
  priority: Priority;
  title: string;
  confidence: Confidence;
  timeframe: { start: string; end: string; label: string };

  summary: string; // 1-line takeaway
  why_it_matters: string;
  expected_impact: {
    label: string;
    value: number;
    units: string; // e.g. "USD", "percent"
    direction: "increase" | "decrease" | "avoid_loss" | "maintain";
  };

  actions: {
    label: string;
    type: "guide" | "autopilot" | "link" | "rule";
    payload?: { route?: string; params?: Record<string, unknown> };
  }[];

  chart: {
    type: ChartType;
    categories?: string[];
    series: { name: string; data: (number | { x: string; y: number })[] }[];
    goal_lines?: { label: string; value: number; axis: "x" | "y" }[];
    annotations?: { type: "point" | "band" | "range"; at: string | number; label: string }[];
    format?: { y_axis: "currency" | "percent" | "number"; currency?: string; percent_scale?: number };
    render_hints?: { emphasis?: "last_point" | "delta" | "segment" };
  };

  metrics?: { name: string; value: number; units: string }[];

  narration?: {
    headline?: string;
    body?: string;
    ask_me_more_suggestions?: string[];
  };

  data_audit?: {
    source_accounts?: string[];
    coverage?: string;
    assumptions?: string[];
    limitations?: string[];
  };

  i18n?: { locale: string };
  version: "card-spec.v1";
}
