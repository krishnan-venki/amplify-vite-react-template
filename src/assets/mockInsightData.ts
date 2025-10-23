// Mock Insight Data for Testing Visual-First Cards
// Place this in your test data or use for manual testing

export const mockInsights = [
  {
    // Example 1: Holiday Spending Alert (Bar with Trend)
    insight_id: "insight-001",
    PK: "USER#test-user",
    SK: "INSIGHT#2024-10-22#spending_pattern",
    insight_type: "spending_pattern",
    priority: "HIGH",
    status: "active",
    vertical: "sagaa_money",
    
    title: "Holiday Season Spending Surge: Prepare for $19,000+ December Expenses",
    summary: "Expenses are projected to surge in December based on 2-year historical trend.",
    
    actions: [
      "Set aside $6,500/month in October-November to build $13,000 holiday buffer",
      "Create detailed holiday budget focusing on top 3 spending categories: Other, Online Purchases, and Entertainment",
      "Track daily spending in December to stay within planned budget"
    ],
    
    impact: "Will prevent $19,500 expense shock at year-end",
    
    // NEW: Visualization data
    visualization: {
      chart_type: "bar_with_trend",
      data: [
        { label: "Jan", value: 12000 },
        { label: "Apr", value: 12500 },
        { label: "Jul", value: 13500 },
        { label: "Oct", value: 14500 },
        { label: "Dec", value: 19000, highlight: true }
      ],
      trend_line: [9000, 10000, 11000, 12000, 12500],
      annotation: "2-year historical data shows consistent December surge"
    },
    
    // NEW: Key metric
    key_metric: {
      primary_value: "$19,000+",
      primary_label: "December Expenses",
      secondary: "+$4,500 vs average month",
      icon: "alert"
    },
    
    // NEW: Structured full content
    full_content: {
      what_happening: "Based on your 2-year spending history, December consistently shows a spending surge averaging $19,000, which is $4,500 (31%) higher than your typical monthly spending of $14,500. The trend shows gradual increases throughout Q4, with the most significant spike in December driven by holiday shopping, gifts, travel, and entertainment expenses.",
      
      why_matters: "This seasonal pattern can create financial stress if you're not prepared. Without a dedicated holiday buffer, you may need to rely on credit cards or emergency savings, which can set back your financial goals. The $4,500 surge represents nearly a third of a typical month's expenses concentrated in just 30 days.",
      
      detailed_actions: [
        {
          action: "Set aside $6,500/month in October-November to build $13,000 holiday buffer",
          rationale: "By saving $6,500 for two months (October and November), you'll have $13,000 set aside before December begins. This covers your projected $19,000 December expenses while maintaining your regular $14,500 baseline, with a $8,500 cushion for unexpected costs."
        },
        {
          action: "Create detailed holiday budget focusing on top 3 spending categories: Other, Online Purchases, and Entertainment",
          rationale: "Historical data shows these three categories drive 78% of your December spending spike. By setting specific limits for each category ($7,000 for gifts, $5,000 for travel, $3,000 for entertainment), you can track and control spending more effectively."
        }
      ],
      
      expected_impact: "By preparing a dedicated $13,000 holiday buffer starting in October, you'll eliminate the typical year-end financial stress. You'll avoid credit card debt, maintain your emergency fund intact, and start January 2025 on solid financial footing. This proactive approach can save you $500-800 in potential credit card interest if you typically carry December balances into the new year.",
      
      community_context: "Users with similar spending patterns who implemented a 2-month holiday savings buffer reported 64% less financial stress in December and paid off holiday expenses 3.2 months faster on average."
    },
    
    generated_at: "2024-10-22T10:00:00Z",
    expires_at: "2024-12-31T23:59:59Z",
    viewed: false,
    viewed_at: null,
    dismissed: false,
    dismissed_at: null,
    timeframe: "next_3_months"
  },
  
  {
    // Example 2: Discretionary Spending Alert (Donut Chart)
    insight_id: "insight-002",
    PK: "USER#test-user",
    SK: "INSIGHT#2024-10-22#discretionary_spending",
    insight_type: "discretionary_spending",
    priority: "MEDIUM",
    status: "active",
    vertical: "sagaa_money",
    
    title: "Discretionary Spending at 93% vs 65% Baseline",
    summary: "Your discretionary spending has increased to 93% of income this month, significantly above your 65% baseline.",
    
    actions: [
      "Reduce dining out from $1,200 to $600 this month",
      "Pause non-essential online purchases until next month",
      "Review and cancel unused subscriptions ($150/month opportunity)"
    ],
    
    impact: "Can recover $900 to rebuild emergency fund",
    
    visualization: {
      chart_type: "donut",
      data: [
        { label: "Dining", value: 1200, highlight: true },
        { label: "Online Shopping", value: 800 },
        { label: "Entertainment", value: 400 },
        { label: "Subscriptions", value: 350 },
        { label: "Other", value: 550 }
      ],
      annotation: "Dining represents 36% of discretionary spending"
    },
    
    key_metric: {
      primary_value: "93%",
      primary_label: "Discretionary Spending",
      secondary: "vs 65% baseline",
      icon: "warning"
    },
    
    full_content: {
      what_happening: "Your discretionary spending has reached 93% of your monthly income this month ($3,300 out of $3,548 available), which is significantly higher than your healthy 65% baseline. This leaves only $248 for savings this month, compared to your typical $1,242 monthly savings rate.",
      
      why_matters: "This elevated spending rate means you're saving 80% less than usual, which can delay your financial goals and reduce your emergency fund cushion. If this pattern continues, you'll fall short of your annual savings goal by $11,928.",
      
      detailed_actions: [
        {
          action: "Reduce dining out from $1,200 to $600 this month",
          rationale: "Dining represents 36% of your discretionary spending and is your highest variable expense. By cutting in half (cooking at home 4 extra times per week), you can save $600 immediately without eliminating the category entirely."
        },
        {
          action: "Pause non-essential online purchases until next month",
          rationale: "Online shopping is your second-largest discretionary category at $800/month. A 30-day pause allows you to assess what you truly need versus impulse purchases, potentially saving $300-500."
        }
      ],
      
      expected_impact: "These adjustments can free up $900 this month, bringing your discretionary spending back to 68% (near your 65% baseline) and restoring your monthly savings to $1,148. This keeps you on track for your annual goals and maintains your emergency fund growth.",
      
      community_context: "Users who implemented similar dining reduction strategies maintained the habit for 3+ months and reported saving an average of $1,800 over that period while discovering new favorite home recipes."
    },
    
    generated_at: "2024-10-22T09:30:00Z",
    expires_at: "2024-11-30T23:59:59Z",
    viewed: false,
    viewed_at: null,
    dismissed: false,
    dismissed_at: null,
    timeframe: "this_month"
  },
  
  {
    // Example 3: Savings Opportunity Forecast (Line Chart)
    insight_id: "insight-003",
    PK: "USER#test-user",
    SK: "INSIGHT#2024-10-22#opportunity_forecast",
    insight_type: "opportunity_forecast",
    priority: "LOW",
    status: "active",
    vertical: "sagaa_money",
    confidence_level: "high",
    
    title: "Projected $4,200 Savings Opportunity in Q1 2025",
    summary: "Based on your income pattern, you can save an additional $1,400/month in Q1 2025 without lifestyle changes.",
    
    actions: [
      "Set up automatic transfer of $1,400/month to high-yield savings starting January",
      "Consider allocating 60% to emergency fund, 40% to investment account"
    ],
    
    impact: "Build $4,200 additional cushion by March 2025",
    
    visualization: {
      chart_type: "line",
      data: [
        { label: "Oct 2024", value: 1200 },
        { label: "Nov 2024", value: 1150 },
        { label: "Dec 2024", value: 400 },
        { label: "Jan 2025", value: 2600, highlight: true },
        { label: "Feb 2025", value: 2650 },
        { label: "Mar 2025", value: 2700 }
      ],
      annotation: "Post-holiday income boost creates savings window"
    },
    
    key_metric: {
      primary_value: "$4,200",
      primary_label: "Q1 2025 Savings Potential",
      secondary: "+$1,400/month opportunity",
      icon: "trend-up"
    },
    
    full_content: {
      what_happening: "Your historical income data shows that Q1 (January-March) typically brings a 22% increase in available savings capacity, with monthly surplus jumping from $1,200 to $2,600. This pattern has been consistent for the past 2 years and is driven by post-holiday spending reduction, annual bonuses, and tax refunds.",
      
      why_matters: "This 3-month window represents your best opportunity of the year to build financial reserves. Capturing this $4,200 surplus can accelerate your emergency fund to 6 months of expenses or jumpstart your investment portfolio. Missing this window means waiting another year for a similar opportunity.",
      
      detailed_actions: [
        {
          action: "Set up automatic transfer of $1,400/month to high-yield savings starting January 1st",
          rationale: "Automating the transfer ensures you 'pay yourself first' before the money gets absorbed into discretionary spending. High-yield savings accounts (currently 4-5% APY) will earn you an additional $40-50 in interest over the quarter."
        }
      ],
      
      expected_impact: "By capturing this Q1 opportunity, you'll build a $4,200 financial cushion that can serve as 1.2 months of emergency fund coverage or investment seed money. The automatic transfer approach has a 91% success rate compared to manual monthly transfers.",
      
      community_context: "Users who capitalized on their Q1 surplus window maintained 73% of that elevated savings rate throughout the year, averaging $16,800 in annual savings versus $8,400 for those who didn't automate."
    },
    
    generated_at: "2024-10-22T08:00:00Z",
    expires_at: "2025-03-31T23:59:59Z",
    viewed: false,
    viewed_at: null,
    dismissed: false,
    dismissed_at: null,
    timeframe: "next_3_months",
    forecast_horizon: "next_quarter"
  },
  
  {
    // Example 4: Simple Comparison Bars
    insight_id: "insight-004",
    PK: "USER#test-user",
    SK: "INSIGHT#2024-10-22#budget_alert",
    insight_type: "budget_alert",
    priority: "MEDIUM",
    status: "active",
    vertical: "sagaa_money",
    
    title: "October Spending Trends: 3 Categories Over Budget",
    summary: "Dining, entertainment, and transportation are currently 15-25% above monthly budget allocations.",
    
    actions: [
      "Reduce dining budget by $200 for remainder of month",
      "Use public transit instead of rideshare (save $80)"
    ],
    
    impact: "Stay within monthly budget, avoid $350 overspend",
    
    visualization: {
      chart_type: "comparison_bars",
      data: [
        { label: "Dining Budget", value: 600 },
        { label: "Dining Actual", value: 750, highlight: true },
        { label: "Entertainment Budget", value: 300 },
        { label: "Entertainment Actual", value: 375, highlight: true },
        { label: "Transport Budget", value: 400 },
        { label: "Transport Actual", value: 460, highlight: true }
      ],
      annotation: "Based on spending through Oct 22nd, projected to month-end"
    },
    
    key_metric: {
      primary_value: "$350",
      primary_label: "Projected Overspend",
      secondary: "across 3 categories",
      icon: "alert"
    },
    
    full_content: "You're currently tracking 15-25% over budget in three key categories. With 9 days left in October, small adjustments now can keep you on track. Focus on the two biggest opportunities: reduce dining by $200 and switch to public transit to save $80. These changes will bring you within budget and maintain your savings goals.",
    
    generated_at: "2024-10-22T07:00:00Z",
    expires_at: "2024-10-31T23:59:59Z",
    viewed: false,
    viewed_at: null,
    dismissed: false,
    dismissed_at: null,
    timeframe: "this_month"
  }
];

// Usage in your component:
// import { mockInsights } from './mockInsightData';
// Then use mockInsights instead of fetched data for testing
