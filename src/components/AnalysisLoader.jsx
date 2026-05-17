import { useEffect, useState } from 'react'
import { analyzePromotion } from '../lib/groq'

const MESSAGES = [
  'Analyzing price elasticity...',
  'Estimating cannibalization impact...',
  'Calculating incremental profit...',
  'Evaluating discount depth...',
  'Comparing historical patterns...',
  'Generating recommendation...',
]

function AnalysisLoader({ promotionData, onComplete }) {
  const [messageIndex, setMessageIndex] = useState(0)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Cycle through messages every 1.5 seconds
    const interval = setInterval(() => {
      setMessageIndex(i => (i + 1) % MESSAGES.length)
    }, 1500)

    // Make the actual API call
    analyzePromotion(promotionData)
      .then(result => {
        clearInterval(interval)
        onComplete(result)
      })
      .catch(err => {
        clearInterval(interval)
        setError('Something went wrong. Please try again.')
        console.error(err)
      })

    return () => clearInterval(interval)
  }, [])

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <p className="text-red-500 font-medium">{error}</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-20 flex flex-col items-center justify-center">

      {/* Spinner */}
      <div className="relative w-16 h-16 mb-8">
        <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
        <div className="absolute inset-0 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin"></div>
      </div>

      {/* Product being analyzed */}
      <p className="text-gray-400 text-sm mb-2">Analyzing</p>
      <p className="text-gray-900 font-semibold text-lg mb-6">
        {promotionData.product} — {promotionData.discount}% off
      </p>

      {/* Cycling messages */}
      <p className="text-indigo-600 text-sm font-medium transition-all duration-500">
        {MESSAGES[messageIndex]}
      </p>

    </div>
  )
}

export default AnalysisLoader