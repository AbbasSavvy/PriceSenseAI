import { useState } from 'react'
import Header from './components/Header'
import PromotionForm from './components/PromotionForm'

function App() {
  const [step, setStep] = useState('form')
  const [promotionData, setPromotionData] = useState(null)

  function handleFormSubmit(data) {
    setPromotionData(data)
    setStep('loading')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {step === 'form' && (
        <PromotionForm onSubmit={handleFormSubmit} />
      )}
      {step === 'loading' && (
        <p className="p-6">Loading... (we will build this next)</p>
      )}
    </div>
  )
}

export default App