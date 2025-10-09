
import { DollarSign, TrendingDown, Calendar,  CheckCircle,  Target, Users, Shield, ArrowRight, Sparkles } from 'lucide-react';

const BillSubscriptionOptimization = () => {
  const stats = [
    { icon: DollarSign, label: 'Average Monthly Savings', value: '$94', subtitle: 'per user', color: 'from-green-50 to-green-100', iconColor: 'text-green-600' },
    { icon: TrendingDown, label: 'Unused Subscriptions Found', value: '68%', subtitle: 'of users', color: 'from-blue-50 to-blue-100', iconColor: 'text-blue-600' },
    { icon: Calendar, label: 'Bills Optimized Monthly', value: '2.3M', subtitle: 'and counting', color: 'from-purple-50 to-purple-100', iconColor: 'text-purple-600' },
    { icon: CheckCircle, label: 'Success Rate', value: '87%', subtitle: 'satisfaction', color: 'from-orange-50 to-orange-100', iconColor: 'text-orange-600' }
  ];

  const savingsOpportunities = [
    {
      category: 'Unused Subscriptions',
      description: 'Sagaa automatically detects services you haven\'t used in 90+ days',
      avgSaving: '$54.99/mo',
      example: 'Adobe Creative Cloud - Last used 89 days ago',
      color: 'red'
    },
    {
      category: 'Underutilized Services',
      description: 'Downgrade plans when usage doesn\'t match your subscription tier',
      avgSaving: '$16.99/mo',
      example: 'Spotify Family → Individual (only 12% usage)',
      color: 'yellow'
    },
    {
      category: 'Bill Negotiation',
      description: 'Community-powered insights on which bills can be negotiated',
      avgSaving: '$35/mo',
      example: 'Internet, mobile, insurance - 73% success rate',
      color: 'blue'
    }
  ];

  const features = [
    {
      icon: Sparkles,
      title: 'AI-Powered Detection',
      description: 'Automatically scans all connected accounts to find subscriptions and recurring bills'
    },
    {
      icon: Target,
      title: 'Smart Usage Tracking',
      description: 'Monitors how often you actually use each service to identify waste'
    },
    {
      icon: Users,
      title: 'Community Benchmarks',
      description: 'Compare your bills against similar users to spot overcharges'
    },
    {
      icon: Shield,
      title: 'Negotiation Scripts',
      description: 'Proven strategies from 4,500+ successful bill negotiations'
    }
  ];

  return (
    <div className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full text-green-800 font-medium text-sm mb-4">
            <TrendingDown className="w-4 h-4" />
            Save an average of $1,128 per year
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Stop Wasting Money on <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
              Forgotten Subscriptions
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Sagaa's AI continuously monitors your spending to find unused subscriptions, 
            overpriced bills, and opportunities to save—so you don't have to.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.color} mb-4`}>
                  <IconComponent className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm font-medium text-gray-900 mb-1">{stat.label}</div>
                <div className="text-xs text-gray-500">{stat.subtitle}</div>
              </div>
            );
          })}
        </div>

        {/* Main Value Proposition */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden mb-16">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left Side - Savings Breakdown */}
            <div className="p-8 md:p-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Target className="w-6 h-6 text-green-600" />
                Three Ways Sagaa Saves You Money
              </h3>
              <div className="space-y-6">
                {savingsOpportunities.map((opp, index) => (
                  <div key={index} className={`rounded-xl p-5 border-2 ${
                    opp.color === 'red' ? 'bg-red-50 border-red-200' :
                    opp.color === 'yellow' ? 'bg-yellow-50 border-yellow-200' :
                    'bg-blue-50 border-blue-200'
                  }`}>
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-semibold text-gray-900">{opp.category}</h4>
                      <span className="text-lg font-bold text-green-600">{opp.avgSaving}</span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{opp.description}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-600 bg-white rounded-lg px-3 py-2">
                      <Sparkles className="w-3 h-3" />
                      <span className="italic">{opp.example}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Community Success Story */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 md:p-12 flex flex-col justify-center">
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full text-purple-600 font-medium text-sm mb-4 shadow-sm">
                  <Users className="w-4 h-4" />
                  Community Success Story
                </div>
                <div className="relative">
                  <div className="absolute -left-2 -top-2 text-6xl text-purple-300 opacity-50">"</div>
                  <blockquote className="relative text-lg text-gray-800 leading-relaxed pl-6">
                    I was paying for 3 streaming services my family barely used. 
                    Sagaa helped me identify <strong className="text-green-600">$45/month in savings</strong> by 
                    consolidating to one service. Over a year, that's <strong className="text-green-600">$540</strong> back in my pocket!
                  </blockquote>
                </div>
              </div>
              <div className="flex items-center gap-3 pl-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  S
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Sarah M.</div>
                  <div className="text-sm text-gray-600">Seattle, WA · Software Engineer</div>
                </div>
              </div>
              
              {/* Community Stats */}
              <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-purple-200">
                <div>
                  <div className="text-2xl font-bold text-purple-600">2,847</div>
                  <div className="text-sm text-gray-600">users saved money</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">87%</div>
                  <div className="text-sm text-gray-600">success rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            How Sagaa Finds Your Savings
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl mb-4 border-2 border-blue-100">
                    <IconComponent className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Real-Time Example */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-8 md:p-12 text-white">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-4">
                  Start Saving in Minutes
                </h3>
                <p className="text-green-50 mb-6 text-lg">
                  Connect your accounts and Sagaa immediately starts finding savings opportunities. 
                  No manual tracking required.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <span>Scan completes in under 60 seconds</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <span>Cancel subscriptions with one click</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <span>Get negotiation scripts for bill reductions</span>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-sm font-medium text-green-100 mb-4">Typical First Scan Results:</div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center bg-white/10 rounded-lg p-3">
                    <span className="text-sm">Unused subscriptions found</span>
                    <span className="font-bold">3 services</span>
                  </div>
                  <div className="flex justify-between items-center bg-white/10 rounded-lg p-3">
                    <span className="text-sm">Immediate savings identified</span>
                    <span className="font-bold">$94/month</span>
                  </div>
                  <div className="flex justify-between items-center bg-white/10 rounded-lg p-3">
                    <span className="text-sm">Bills ready to negotiate</span>
                    <span className="font-bold">2 opportunities</span>
                  </div>
                  <div className="bg-yellow-400 text-yellow-900 rounded-lg p-3 mt-4">
                    <div className="text-xs font-medium mb-1">Annual Savings Potential</div>
                    <div className="text-2xl font-bold">$1,128</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <button className="px-8 py-4 bg-white text-green-600 rounded-xl font-semibold text-lg hover:bg-green-50 transition-colors inline-flex items-center gap-2 shadow-xl">
                Start Saving Money Today
                <ArrowRight className="w-5 h-5" />
              </button>
              <p className="mt-3 text-green-100 text-sm">Free scan · No credit card required</p>
            </div>
          </div>
        </div>

        {/* Community Proof */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-6 flex-wrap justify-center">
            <div className="flex items-center gap-2 text-gray-600">
              <div className="flex -space-x-2">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className={`w-8 h-8 rounded-full border-2 border-white ${
                    i === 1 ? 'bg-blue-400' :
                    i === 2 ? 'bg-green-400' :
                    i === 3 ? 'bg-purple-400' :
                    i === 4 ? 'bg-orange-400' :
                    'bg-pink-400'
                  }`} />
                ))}
              </div>
              <span className="text-sm font-medium">
                Join <strong className="text-gray-900">4,521</strong> users saving money
              </span>
            </div>
            <div className="flex items-center gap-1 text-yellow-500">
              {[1,2,3,4,5].map(i => (
                <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
              <span className="ml-2 text-gray-600 text-sm font-medium">4.8/5 average rating</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillSubscriptionOptimization;