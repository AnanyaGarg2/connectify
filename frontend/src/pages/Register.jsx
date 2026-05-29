import React, { useContext, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

function Register() {
  const { registerUser, loading, error } = useContext(AuthContext)
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await registerUser(form)
      navigate('/')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="mx-auto max-w-md rounded-3xl border border-slate-800 bg-slate-950 p-8 shadow-xl shadow-slate-950/30">
      <h1 className="text-3xl font-bold text-white">Sign up</h1>
      <p className="mt-3 text-slate-400">Create your account to save notes and replies securely.</p>
      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="text-sm text-slate-300">Username</label>
          <input
            type="text"
            value={form.username}
            onChange={(e) => setForm((prev) => ({ ...prev, username: e.target.value }))}
            className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-400"
            placeholder="Username"
          />
        </div>
        <div>
          <label className="text-sm text-slate-300">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
            className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-400"
            placeholder="Email"
          />
        </div>
        <div>
          <label className="text-sm text-slate-300">Password</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
            className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-400"
            placeholder="Password"
          />
        </div>
        {error && <p className="text-sm text-rose-400">{error}</p>}
        <button
          type="submit"
          className="w-full rounded-2xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
          disabled={loading}
        >
          {loading ? 'Creating account…' : 'Sign up'}
        </button>
      </form>
      <p className="mt-6 text-sm text-slate-400">
        Already have an account? <Link to="/login" className="text-cyan-300 hover:underline">Login</Link>
      </p>
    </div>
  )
}

export default Register
