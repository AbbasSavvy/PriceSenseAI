import { useState } from 'react'
import Header from './components/Header'
import PromotionForm from './components/PromotionForm'
import AnalysisLoader from './components/AnalysisLoader'
import RecommendationView from './components/RecommendationView'

function App() {
  const [step, setStep] = useState('form')
  const [promotionData, setPromotionData] = useState(null)
  const [result, setResult] = useState(null)

  function handleFormSubmit(data) {
    setPromotionData(data)
    setStep('loading')
  }

  function handleAnalysisComplete(data) {
    setResult(data)
    setStep('results')
  }

  function handleReset() {
    setStep('form')
    setPromotionData(null)
    setResult(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {step === 'form' && (
        <PromotionForm onSubmit={handleFormSubmit} />
      )}
      {step === 'loading' && (
        <AnalysisLoader
          promotionData={promotionData}
          onComplete={handleAnalysisComplete}
        />
      )}
      {step === 'results' && (
        <RecommendationView
          result={result}
          promotionData={promotionData}
          onReset={handleReset}
        />
      )}
    </div>
  )
}

export default App