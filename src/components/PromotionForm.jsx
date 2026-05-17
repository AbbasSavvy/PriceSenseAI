import { useState } from 'react'

const CATEGORIES = [
  'Specialty Food',
  'Grocery',
  'Beverages',
  'Snacks & Nuts',
  'Dairy',
  'Bakery',
  'Health & Wellness',
]

const CATALOG = {
  'Specialty Food': [
    'Salted Pistachios 250g',
    'Salted Pistachios 500g',
    'Salted Pistachios 1kg',
    'Roasted Almonds 250g',
    'Roasted Almonds 500g',
    'Roasted Almonds 1kg',
    'Mixed Nuts Variety Pack',
  ],
  'Grocery': [
    'Olive Oil 500ml',
    'Pasta 500g',
    'Canned Tomatoes 400g',
    'Rice 1kg',
    'Cereal 500g',
  ],
  'Beverages': [
    'Orange Juice 1L',
    'Sparkling Water 12-pack',
    'Green Tea 20-pack',
    'Cold Brew Coffee 1L',
    'Lemonade 1.5L',
  ],
  'Snacks & Nuts': [
    'Trail Mix 300g',
    'Granola Bars 6-pack',
    'Popcorn 250g',
    'Pretzels 500g',
    'Cashews 350g',
  ],
  'Dairy': [
    'Full Cream Milk 1L',
    'Greek Yogurt 1kg',
    'Cheddar Cheese 500g',
    'Butter 500g',
    'Cream Cheese 250g',
  ],
  'Bakery': [
    'Sourdough Bread 400g',
    'Bagels 6-pack',
    'Croissants 4-pack',
    'Muffins 4-pack',
    'Dinner Rolls 12-pack',
  ],
  'Health & Wellness': [
    'Protein Powder 1kg',
    'Multivitamins 60-count',
    'Collagen Peptides 300g',
    'Omega-3 90-count',
    'Probiotic 30-count',
  ],
}

function PromotionForm({ onSubmit }) {
  const [form, setForm] = useState({
    category: 'Specialty Food',
    product: 'Salted Pistachios 500g',
    currentPrice: '',
    discount: 20,
    duration: 7,
    context: '',
  })

  function handleCategoryChange(e) {
    const newCategory = e.target.value
    setForm({
      ...form,
      category: newCategory,
      product: CATALOG[newCategory][0],
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    const relatedSkus = CATALOG[form.category].filter(s => s !== form.product)
    onSubmit({ ...form, relatedSkus })
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">

      {/* Page title */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Analyze a Promotion</h1>
        <p className="text-gray-500 mt-1">Fill in the details below and we'll tell you if it's worth running.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 p-8 space-y-6">

        {/* Row 1: Category + Product */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Retailer Category</label>
            <select
              value={form.category}
              onChange={handleCategoryChange}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {CATEGORIES.map(c => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product to Promote</label>
            <select
              value={form.product}
              onChange={e => setForm({ ...form, product: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {CATALOG[form.category].map(p => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 2: Price + Discount + Duration */}
        <div className="grid grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Price (₹)</label>
            <input
              type="number"
              required
              min="0"
              step="0.01"
              placeholder="e.g. 499"
              value={form.currentPrice}
              onChange={e => setForm({ ...form, currentPrice: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Discount — <span className="text-indigo-600 font-semibold">{form.discount}% off</span>
            </label>
            <input
              type="range"
              min="5"
              max="50"
              step="5"
              value={form.discount}
              onChange={e => setForm({ ...form, discount: Number(e.target.value) })}
              className="w-full accent-indigo-600"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>5%</span>
              <span>50%</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration — <span className="text-indigo-600 font-semibold">{form.duration} days</span>
            </label>
            <input
              type="range"
              min="1"
              max="30"
              step="1"
              value={form.duration}
              onChange={e => setForm({ ...form, duration: Number(e.target.value) })}
              className="w-full accent-indigo-600"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>1 day</span>
              <span>30 days</span>
            </div>
          </div>
        </div>

        {/* Row 3: Additional context */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional Context <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <textarea
            rows={3}
            placeholder="e.g. competitor running a similar promo, end of season clearance, new product launch..."
            value={form.context}
            onChange={e => setForm({ ...form, context: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          />
        </div>

        {/* Related SKUs preview */}
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Related SKUs that may be affected</p>
          <div className="flex flex-wrap gap-2">
            {CATALOG[form.category]
              .filter(s => s !== form.product)
              .map(s => (
                <span key={s} className="text-xs bg-white border border-gray-200 text-gray-600 px-2 py-1 rounded-full">
                  {s}
                </span>
              ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          Analyze Promotion →
        </button>

      </form>
    </div>
  )
}

export default PromotionForm