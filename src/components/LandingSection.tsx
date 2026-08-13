import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
}

const audiences = [
  { icon: 'fi-rr-graduation-cap', title: 'Students', desc: 'Track pocket money, part-time income, and monthly spending without overcomplicating it.', accent: 'amber' },
  { icon: 'fi-rr-laptop', title: 'Freelancers', desc: 'Log irregular income from multiple clients and see your real monthly picture.', accent: 'blue' },
  { icon: 'fi-rr-briefcase', title: 'Young professionals', desc: 'Build the habit of budgeting and saving early, with goals you can actually see progress on.', accent: 'purple' },
  { icon: 'fi-rr-home', title: 'Households', desc: 'Keep shared expenses, bills, and savings goals organized in one simple place.', accent: 'teal' },
] as const

const accentStyles: Record<string, { bg: string; text: string }> = {
  amber: { bg: 'bg-amber-50', text: 'text-amber-700' },
  blue: { bg: 'bg-blue-50', text: 'text-blue-700' },
  purple: { bg: 'bg-purple-50', text: 'text-purple-700' },
  teal: { bg: 'bg-teal-50', text: 'text-teal-700' },
}

interface Props {
  onGetStarted: () => void
}

export function LandingSections({ onGetStarted }: Props) {
  return (
    <div className="relative overflow-hidden bg-[#F7F5F0]">
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

      {/* How it works — connected timeline */}
      <section className="max-w-6xl mx-auto px-8 py-16 relative " id="how-it-works">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 bg-[#2F5D4E]/10 text-[#2F5D4E] text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            ✦ Simple by design
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">How FinTrack works</h2>
        </motion.div>

        <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-5">
          {/* Connecting line — desktop only, sits behind the step badges */}
          <div className="hidden sm:block absolute top-8 left-[16.6%] right-[16.6%] h-px bg-linear-to-r from-transparent via-[#2F5D4E]/25 to-transparent" />

          {[
            { step: '1', icon: 'fi-rr-add', title: 'Add your transactions', desc: 'Log income and expenses in seconds, categorized as you go.' },
            { step: '2', icon: 'fi-rr-target', title: 'Set budgets & goals', desc: 'Put a limit on spending, or a target on saving — track both live.' },
            { step: '3', icon: 'fi-rr-chart-pie-alt', title: 'See where you stand', desc: 'Clear charts and monthly summaries show your patterns at a glance.' },
          ].map((s, i) => (
            <motion.div
              key={s.step}
              className="relative"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <div className="relative z-10 w-16 h-16 rounded-2xl bg-[#2F5D4E] text-white flex items-center justify-center mx-auto mb-5 text-xl shadow-lg shadow-[#2F5D4E]/20">
                <i className={`fi ${s.icon}`}></i>
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white border-2 border-[#2F5D4E] text-[#2F5D4E] text-xs font-bold flex items-center justify-center">
                  {s.step}
                </span>
              </div>
              <div className="text-center">
                <p className="font-semibold text-gray-900 mb-2">{s.title}</p>
                <p className="text-sm text-gray-500 leading-relaxed max-w-55 mx-auto">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Who it's for — distinct accent per audience */}
      <section className="max-w-6xl mx-auto px-8 py-16" id="who-its-for">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Built for how you actually manage money</h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">Whoever you are, FinTrack adapts to your rhythm — no complicated setup required.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {audiences.map((a, i) => {
            const accent = accentStyles[a.accent]
            return (
              <motion.div
                key={a.title}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 transition-shadow duration-400 hover:shadow-lg"
                initial="hidden"
                whileInView="show"
                whileHover={{ y: -6 }}
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <span className={`w-11 h-11 rounded-xl ${accent.bg} ${accent.text} flex items-center justify-center text-lg mb-4`}>
                  <i className={`fi ${a.icon}`}></i>
                </span>
                <p className="font-semibold text-gray-900 mb-2">{a.title}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{a.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Why FinTrack — icon-led stat strip */}
    

      {/* Closing CTA */}
      <section className="max-w-4xl mx-auto p-8 text-center">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to take control of your money?</h2>
          <p className="text-gray-500 mb-8">Start tracking in seconds — no signup required to try it.</p>
          <button
            onClick={onGetStarted}
            className="bg-[#2F5D4E] text-white px-8 py-3.5 rounded-lg font-medium hover:bg-[#264A3E] transition-colors shadow-lg shadow-[#2F5D4E]/20"
          >
            Get Started Free →
          </button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto p-3 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-400">
        <span>© 2026 FinTrack. Built as a learning project.</span>
        <span>Made with React + TypeScript</span>
      </footer>
    </div>
  )
}