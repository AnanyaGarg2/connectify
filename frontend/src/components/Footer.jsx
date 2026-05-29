import React from 'react'

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-slate-950 text-slate-100 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-3">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-3 rounded-3xl bg-white/5 px-4 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-white/10">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-lg text-white">
              C
            </span>
            Connectify
          </div>

          <p className="max-w-sm leading-7 text-slate-400">
            A clean, simple notes experience for staying organized. Create, manage, and revisit your ideas from anywhere.
          </p>

          <div className="flex flex-wrap gap-3 text-sm text-slate-400">
            <span className="rounded-full bg-white/5 px-3 py-1">Quick notes</span>
            <span className="rounded-full bg-white/5 px-3 py-1">Cloud-ready</span>
            <span className="rounded-full bg-white/5 px-3 py-1">Easy sharing</span>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
            Explore
          </h2>
          <ul className="mt-5 space-y-3 text-slate-300">
            <li>
              <a href="/" className="hover:text-white transition-colors">Home</a>
            </li>
            <li>
              <a href="/create" className="hover:text-white transition-colors">Create note</a>
            </li>
            <li>
              <a href="/notes" className="hover:text-white transition-colors">My notes</a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
            Company
          </h2>
          <ul className="mt-5 space-y-3 text-slate-300">
            <li>
              <a href="#" className="hover:text-white transition-colors">About</a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">Support</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800 px-6 py-6">
        <div className="max-w-7xl mx-auto flex flex-col gap-4 md:flex-row md:items-center md:justify-between text-sm text-slate-500">
          <p>© {year} Connectify. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
