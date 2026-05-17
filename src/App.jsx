import { useState } from 'react'

function App() {
  const [step, setStep] = useState('form')

  return (
    <div className="min-h-screen bg-gray-50">
      <p>Price Sense AI is working</p>
    </div>
  )
}

export default App