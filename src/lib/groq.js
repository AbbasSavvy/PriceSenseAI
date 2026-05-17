const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY

export async function analyzePromotion(promotionData) {
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GROQ_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: `You are an expert retail promotion analyst. 
You analyze proposed promotions and return a JSON object only — no explanation, no markdown, just raw JSON.`
        },
        {
          role: 'user',
          content: buildPrompt(promotionData)
        }
      ],
      temperature: 0.4
    })
  })

  const data = await response.json()
  const text = data.choices[0].message.content
  const clean = text.replace(/```json|```/g, '').trim()
  return JSON.parse(clean)
}

function buildPrompt(p) {
  return `
Analyze this proposed retail promotion and return ONLY a JSON object with exactly these fields:

{
  "recommendation": "YES" or "NO" or "MODIFY",
  "confidence": "low" or "medium" or "high",
  "projected_lift_percent": number,
  "baseline_units": number,
  "incremental_units": number,
  "cannibalization_risk": "low" or "medium" or "high",
  "cannibalized_skus": [array of SKU name strings likely to be affected],
  "revenue_impact": number (in dollars, can be negative),
  "profit_impact": number (in dollars, can be negative),
  "reasoning": [array of 3-4 strings explaining the recommendation],
  "alternative_suggestion": string or null
}

Promotion details:
- Retailer category: ${p.category}
- Product: ${p.product}
- Current price: ₹${p.currentPrice}
- Proposed discount: ${p.discount}%
- Duration: ${p.duration} days
- Related SKUs in catalog: ${p.relatedSkus.join(', ')}
- Additional context: ${p.context || 'None'}

Be realistic. Factor in price elasticity, cannibalization of related SKUs, and margin impact.
`
}