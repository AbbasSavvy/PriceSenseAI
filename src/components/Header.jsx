function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">P</span>
          </div>
          <span className="text-gray-900 font-semibold text-lg">Price Sense AI</span>
        </div>
        <span className="text-sm text-gray-500">Promotion Analyzer</span>
      </div>
    </header>
  )
}

export default Header