# Price Sense AI

An AI-powered promotion analysis tool that helps retailers answer: **"Should I run this promotion?"**

🔗 **Live Demo:** [price-sense-ai-lake.vercel.app](https://price-sense-ai-lake.vercel.app)

---

## What It Does

Retailers enter a proposed promotion, product, discount %, and duration, and Price Sense AI returns:

- **Recommendation** - YES / NO / MODIFY with confidence level.
- **Projected Sales Lift** - Estimated unit volume increase.
- **Revenue & Profit Impact** - Net financial effect after discount.
- **Cannibalization Risk** - Which related SKUs are likely to be affected?
- **Reasoning** - Why the AI made that recommendation?
- **Alternative Suggestion** - A better version of the promotion if applicable.

## Who It's For

Mid-market retailers (\$50M – \$500M revenue) running frequent promotions across categories like grocery, specialty food, and beverages.

## Supported Categories

- Specialty Food
- Grocery
- Beverages
- Snacks & Nuts
- Dairy
- Bakery
- Health & Wellness

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React + Vite |
| Styling | Tailwind CSS |
| Charts | Chart.js + react-chartjs-2 |
| AI | Groq API (Llama 3.3 70B) |
| Deployment | Vercel |

---

## Running Locally

**Prerequisites:** Node.js 18+

```bash
# Clone the repo
git clone https://github.com/AbbasSavvy/PriceSenseAI.git
cd PriceSenseAI

# Install dependencies
npm install

# Add your Groq API key
echo "VITE_GROQ_API_KEY=your_key_here" > .env

# Start dev server
npm run dev
```

Get a free Groq API key at [console.groq.com](https://console.groq.com)

---

## Project Structure

```
src/
├── components/
│   ├── Header.jsx            # Top navigation
│   ├── PromotionForm.jsx     # Step 1: promotion input
│   ├── AnalysisLoader.jsx    # Step 2: AI analysis + loading state
│   └── RecommendationView.jsx # Step 3: results + charts
├── lib/
│   └── groq.js               # Groq API integration + prompt builder
└── App.jsx                   # Main app, controls step flow
```

---

## Architecture Note

The API key is injected via Vercel environment variables and never committed to the repo. For production use, all LLM calls should be proxied through a backend API rather than called directly from the frontend.