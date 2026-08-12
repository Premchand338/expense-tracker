import { AnimatePresence, motion } from 'framer-motion'
import fintrackHero from '../assets/heroSectionImg(3).png'
import { useState } from 'react'

export function LandingPage({ onGetStarted }: { onGetStarted: () => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  return (
    <div className="min-h-screen bg-[#F7F5F0] overflow-hidden relative">
      {/* Background blobs — now brand green, not mint */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-40 w-125 h-125 rounded-full bg-[#2F5D4E]/10 z-0"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-40 w-100 h-100 rounded-full bg-[#2F5D4E]/10 z-0"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.15 }}
      />

      <div className="relative z-10">
        {/* Nav */}
        <motion.header
          className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center gap-2">
            <span className="bg-[#2F5D4E] text-white w-9 h-9 rounded-lg flex items-center justify-center text-sm">📊</span>
            <span className="font-bold text-xl text-gray-900">FinTrack</span>
          </div>
         <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            {['How it works', 'Features', 'About Us'].map((label) => (
              <a key={label} href={`#${label.toLowerCase().replace(' ', '-')}`} className="relative group">
                {label}
                <span className="absolute left-0 -bottom-1 h-px w-0 bg-[#2F5D4E] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>
        
          <motion.button
            onClick={onGetStarted}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="hidden sm:flex bg-[#2F5D4E] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#264A3E] transition-colors items-center gap-2"
          >
            Sign Up →
          </motion.button>
           <button
            onClick={() => setIsMenuOpen((v) => !v)}
            className="md:hidden w-10 h-10 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-lg"
            aria-label="Menu"
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </motion.header>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden px-6 pb-6 max-w-7xl mx-auto flex flex-col gap-1"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              {['Pricing', 'Features', 'About Us'].map((label) => (
                <a
                  key={label}
                  href={`#${label.toLowerCase().replace(' ', '-')}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="py-2.5 text-sm font-medium text-gray-700"
                >
                  {label}
                </a>
              ))}
              <button
                onClick={onGetStarted}
                className="mt-2 bg-[#2F5D4E] text-white px-5 py-2.5 rounded-lg text-sm font-medium"
              >
                Sign Up →
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero */}
        <main className="max-w-7xl mx-auto px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="inline-flex items-center gap-2 bg-[#2F5D4E]/10 text-[#2F5D4E] text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              ✦ Smart Finance, Better Future
            </span>

            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-[1.05] mb-6">
              Track. Analyze.
              <br />
              Grow Your <span className="text-[#2F5D4E]">Money.</span>
            </h1>

            <p className="text-lg text-gray-500 max-w-md mb-8 leading-relaxed">
              A simple and smart way to manage income, expenses and savings.
            </p>

            <div className="flex items-center gap-4 mb-10">
             <motion.div
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-10"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <motion.button
                onClick={onGetStarted}
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="bg-[#2F5D4E] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#264A3E] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#2F5D4E]/20"
              >
                Get Started Free →
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:border-gray-400 transition-colors flex items-center justify-center gap-2"
              >
                ▶ View Demo
              </motion.button>
            </motion.div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: '💼', title: 'Track Transactions', desc: 'Add and organize with ease' },
                { icon: '📊', title: 'Visualize Spending', desc: 'Clear charts & insights' },
                { icon: '🛡️', title: 'Secure & Private', desc: 'Your data is protected' },
              ].map((f) => (
                <div key={f.title}>
                  <span className="bg-[#2F5D4E]/10 w-9 h-9 rounded-lg flex items-center justify-center text-lg mb-2">
                    {f.icon}
                  </span>
                  <p className="text-sm font-semibold text-gray-900">{f.title}</p>
                  <p className="text-xs text-gray-500">{f.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="w-full flex justify-between lg:justify-end"
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
          >
            <motion.img
              src={fintrackHero}
              alt="FinTrack dashboard preview"
              className="w-full max-w-full lg:max-w-225 object-cover rounded-lg shadow-[#2F5D4E]/20 shadow-xl"
              whileHover={{ y: -10, scale: 1.02 }}
              animate={{ y: [0, -8, 0], rotate: [0, 0.5, 0, -0.5, 0] }}
              transition={{ duration: 8, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
            />
          </motion.div>
        </main>

        <motion.p
          className="text-center text-sm text-gray-500 pb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          🛡️ Join <span className="font-semibold text-gray-900">10,000+</span> users who are managing their finances smarter every day.
        </motion.p>
      </div>

      {/* --- below-the-fold content goes here, see suggestions below --- */}
    </div>
  )
}