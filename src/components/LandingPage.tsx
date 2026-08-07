import fintrackHero from '../assets/herosectionImg.png'

export function LandingPage({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <div className="min-h-screen bg-linear-to-br from-[#F7F5F0] to-[#EAF0EA] px-8 py-6">
      <header className="flex items-center gap-2 mb-4">
        <span className="bg-[#2F5D4E] text-white w-8 h-8 rounded-lg flex items-center justify-center text-sm">📊</span>
        <span className="font-bold text-lg text-gray-900">FinTrack</span>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-10">
        {/* Left column — unchanged */}
        <div>
          <h1 className="section-title tracking-tight leading-[1.05] mb-5">
            Track Your Money.
            <br />
            Build Your <span className="text-[#2F5D4E]">Future.</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-md mb-8 leading-relaxed">
            A smart and simple way to manage your income, expenses and savings — all in one place.
          </p>

          <div className="space-y-4 mb-8">
            {[
              { icon: '📈', label: 'Track income & expenses' },
              { icon: '🥧', label: 'Visualize your spending' },
              { icon: '💰', label: 'Make smarter financial decisions' },
            ].map((f) => (
              <div key={f.label} className="app-card flex items-center gap-3">
                <span className="bg-green-50 w-10 h-10 rounded-2xl flex items-center justify-center text-lg">{f.icon}</span>
                <span className="text-gray-700 font-medium">{f.label}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onGetStarted}
              className="app-btn btn-primary px-8"
            >
              Get started →
            </button>
            <button onClick={onGetStarted} className="app-btn btn-ghost px-8">
              Explore dashboard →
            </button>
          </div>
        </div>

        {/* Right column — your SVG */}
        <div className="w-full">
          <img src={fintrackHero} alt="FinTrack dashboard preview" className="w-full h-auto shadow-amber-200" />
        </div>
      </main>

{/* How it works */}
<section className="max-w-5xl mx-auto py-16">
  <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">How FinTrack works</h2>
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
    {[
      { step: '1', title: 'Add your transactions', desc: 'Log income and expenses in seconds, categorized automatically.' },
      { step: '2', title: 'Set budgets & goals', desc: 'Put a limit on spending, or a target on saving — track both live.' },
      { step: '3', title: 'See where you stand', desc: 'Clear charts show your spending patterns and progress at a glance.' },
    ].map((s) => (
      <div key={s.step} className="app-card text-center">
        <div className="w-10 h-10 rounded-full bg-[#2F5D4E] text-white font-bold flex items-center justify-center mx-auto mb-4">
          {s.step}
        </div>
        <p className="font-semibold text-gray-900 mb-2">{s.title}</p>
        <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
      </div>
    ))}
  </div>
</section>

{/* Why FinTrack */}
<section className="max-w-5xl mx-auto py-10">
  <div className="app-card p-8 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
    {[
      { stat: '100%', label: 'Private — your data stays on your device' },
      { stat: '₹0', label: 'Free to use, no subscriptions' },
      { stat: '5', label: 'Tools in one place: transactions, budgets, goals, charts, insights' },
    ].map((s) => (
      <div key={s.label}>
        <p className="text-3xl font-bold text-[#2F5D4E] mb-2">{s.stat}</p>
        <p className="text-sm text-gray-500">{s.label}</p>
      </div>
    ))}
  </div>
</section>

{/* Footer */}
<footer className="max-w-5xl mx-auto py-8 mt-10 border-t border-gray-200 flex items-center justify-between text-sm text-gray-400">
  <span>© 2026 FinTrack. Built as a learning project.</span>
  <span>Made with React + TypeScript</span>
</footer>
    </div>
  )
}