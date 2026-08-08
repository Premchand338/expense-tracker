import fintrackHero from '../assets/heroSectionImg(3).png'
// import blobBg from '../assets/blob_background.png'

export function LandingPage({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <div className="min-h-screen bg-white overflow-hidden relative">
      {/* Background blobs — decorative, behind everything */}
        <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-40 w-125 h-125 rounded-full bg-[#00E38C] opacity-90 z-0"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-40 w-100 h-100 rounded-full bg-[#00E38C] opacity-90 z-0"
      />
      <div className="relative z-10">
        {/* Nav */}
        <header className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <span className="bg-[#00E38C] text-white w-9 h-9 rounded-lg flex items-center justify-center text-sm">📊</span>
            <span className="font-bold text-xl text-gray-900">FinTrack</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#pricing" className="hover:text-gray-900">Pricing</a>
             <a href="#features" className="hover:text-gray-900">Features</a>
            <a href="#about" className="hover:text-gray-900">About Us</a>
          </nav>
          <button
            onClick={onGetStarted}
            className="bg-[#3c826e] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#0A2E24] transition-colors flex items-center gap-2"
          >
            Sign Up →
          </button>
        </header>

        {/* Hero */}
        <main className="max-w-7xl mx-auto px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-10">
          <div>
            <span className="inline-flex items-center gap-2 bg-green-50 text-green-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              ✦ Smart Finance, Better Future
            </span>

            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-[1.05] mb-6">
              Track. Analyze.
              <br />
              Grow Your <span className="text-[#00C97A]">Money.</span>
            </h1>

            <p className="text-lg text-gray-500 max-w-md mb-8 leading-relaxed">
              A simple and smart way to manage income, expenses and savings.
            </p>

            <div className="flex items-center gap-4 mb-10">
              <button
                onClick={onGetStarted}
                className="bg-[#00C97A] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#00B36B] transition-colors flex items-center gap-2"
              >
                Get Started Free →
              </button>
              <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:border-gray-400 transition-colors flex items-center gap-2">
                ▶ View Demo
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: '💼', title: 'Track Transactions', desc: 'Add and organize with ease' },
                { icon: '📊', title: 'Visualize Spending', desc: 'Clear charts & insights' },
                { icon: '🛡️', title: 'Secure & Private', desc: 'Your data is protected' },
              ].map((f) => (
                <div key={f.title}>
                  <span className="bg-green-50 w-9 h-9 rounded-lg flex items-center justify-center text-lg mb-2">
                    {f.icon}
                  </span>
                  <p className="text-sm font-semibold text-gray-900">{f.title}</p>
                  <p className="text-xs text-gray-500">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full flex justify-between lg:justify-end">
            <img
              src={fintrackHero}
              alt="FinTrack dashboard preview"
              className="w-full max-w-full lg:max-w-225 object-cover rounded-lg shadow-lime-800/40 shadow-lg"
            />
          </div>
        </main>

        <p className="text-center text-sm text-gray-500 pb-10">
          🛡️ Join <span className="font-semibold text-gray-900">10,000+</span> users who are managing their finances smarter every day.
        </p>
      </div>

      {/* --- keep your existing How it works / Why FinTrack / Footer sections below, unchanged --- */}
    </div>
  )
}