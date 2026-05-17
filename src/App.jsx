import { useState } from 'react'
import Header from './components/Header'

function App() {
  const [step, setStep] = useState('form')

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <p className="p-6">Price Sense AI is working</p>
    </div>
  )
}

export default App