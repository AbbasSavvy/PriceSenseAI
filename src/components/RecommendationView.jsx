import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

const RISK_COLORS = {
  low: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', dot: 'bg-green-500' },
  medium: { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200', dot: 'bg-yellow-500' },
  high: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', dot: 'bg-red-500' },
}

const RECOMMENDATION_COLORS = {
  YES: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-300', label: '✓ Run this promotion' },
  NO: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-300', label: '✗ Do not run this promotion' },
  MODIFY: { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-300', label: '⚠ Modify before running' },
}

function StatCard({ label, value, sub, highlight }) {
  return (
    <div className={`bg-white rounded-xl border p-5 ${highlight ? 'border-indigo-200' : 'border-gray-200'}`}>
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className={`text-2xl font-bold ${highlight ? 'text-indigo-600' : 'text-gray-900'}`}>{value}</p>
      {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
    </div>
  )
}

function RecommendationView({ result, promotionData, onReset }) {
  const rec = RECOMMENDATION_COLORS[result.recommendation] || RECOMMENDATION_COLORS['MODIFY']
  const risk = RISK_COLORS[result.cannibalization_risk] || RISK_COLORS['medium']

  const discountedPrice = (promotionData.currentPrice * (1 - promotionData.discount / 100)).toFixed(2)
  const profitPositive = result.profit_impact >= 0

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Promotion Analysis</h1>
          <p className="text-gray-500 mt-1">
            {promotionData.product} — {promotionData.discount}% off for {promotionData.duration} days
          </p>
        </div>
        <button
          onClick={onReset}
          className="text-sm text-indigo-600 hover:text-indigo-700 font-medium border border-indigo-200 px-4 py-2 rounded-lg hover:bg-indigo-50 transition-colors"
        >
          ← New Analysis
        </button>
      </div>

      {/* Recommendation banner */}
      <div className={`rounded-xl border-2 p-6 ${rec.bg} ${rec.border}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider opacity-60 mb-1">Recommendation</p>
            <p className={`text-2xl font-bold ${rec.text}`}>{rec.label}</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-semibold uppercase tracking-wider opacity-60 mb-1">Confidence</p>
            <p className={`text-lg font-bold capitalize ${rec.text}`}>{result.confidence}</p>
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard
          label="Projected Sales Lift"
          value={`+${result.projected_lift_percent}%`}
          sub="vs baseline period"
          highlight
        />
        <StatCard
          label="Discounted Price"
          value={`$${discountedPrice}`}
          sub={`from $${promotionData.currentPrice}`}
        />
        <StatCard
          label="Revenue Impact"
          value={`${result.revenue_impact >= 0 ? '+' : ''}$${result.revenue_impact.toLocaleString()}`}
          sub="estimated over promo period"
        />
        <StatCard
          label="Profit Impact"
          value={`${profitPositive ? '+' : ''}$${result.profit_impact.toLocaleString()}`}
          sub="net incremental profit"
        />
      </div>

      {/* Chart + Cannibalization */}
      <div className="grid grid-cols-2 gap-6">

        {/* Units chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm font-semibold text-gray-700 mb-4">Unit Volume Breakdown</p>
          <Bar
            data={{
              labels: ['Baseline Units', 'Incremental Units'],
              datasets: [{
                data: [result.baseline_units, result.incremental_units],
                backgroundColor: ['#e0e7ff', '#4f46e5'],
                borderRadius: 6,
              }]
            }}
            options={{
              plugins: { legend: { display: false } },
              scales: { y: { beginAtZero: true } }
            }}
          />
        </div>

        {/* Cannibalization */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm font-semibold text-gray-700 mb-3">Cannibalization Risk</p>
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium mb-4 ${risk.bg} ${risk.border} ${risk.text}`}>
            <span className={`w-2 h-2 rounded-full ${risk.dot}`}></span>
            {result.cannibalization_risk.charAt(0).toUpperCase() + result.cannibalization_risk.slice(1)} Risk
          </div>
          <p className="text-xs text-gray-500 mb-2 font-medium">SKUs likely to be affected:</p>
          <div className="flex flex-wrap gap-2">
            {Array.isArray(result.cannibalized_skus) && result.cannibalized_skus.length > 0
              ? result.cannibalized_skus.map(sku => (
                <span key={sku} className="text-xs bg-gray-50 border border-gray-200 text-gray-600 px-2 py-1 rounded-full">
                  {sku}
                </span>
              ))
              : <span className="text-xs text-gray-400">No significant cannibalization expected</span>
            }
          </div>
        </div>

      </div>

      {/* Reasoning */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <p className="text-sm font-semibold text-gray-700 mb-3">Why this recommendation?</p>
        <ul className="space-y-2">
          {(Array.isArray(result.reasoning) ? result.reasoning : []).map((reason, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
              <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                {i + 1}
              </span>
              {reason}
            </li>
          ))}
        </ul>
      </div>

      {/* Alternative suggestion */}
      {result.alternative_suggestion && (
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5">
          <p className="text-sm font-semibold text-indigo-700 mb-1">💡 Alternative to Consider</p>
          <p className="text-sm text-indigo-700">{result.alternative_suggestion}</p>
        </div>
      )}

    </div>
  )
}

export default RecommendationView