import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

function Navbar() {
  const { user, logoutUser } = useContext(AuthContext)
  const isLoggedIn = Boolean(user)

  return (
    <nav className="w-full border-b bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-2xl bg-black text-white flex items-center justify-center font-bold text-lg">
            C
          </div>

          <h1 className="text-2xl font-bold tracking-tight">
            Connectify
          </h1>
        </div>

        <div className="flex items-center gap-6 text-sm md:text-base font-medium text-black">
          <Link to="/" className="hover:text-gray-500 transition-colors">Home</Link>
          <Link to="/notes" className="hover:text-gray-500 transition-colors">Notes</Link>
          <Link to="/stress" className="hover:text-gray-500 transition-colors">Stress Relief</Link>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">

            {!isLoggedIn ? (
            <>
                <button className="px-5 py-2 rounded-2xl border hover:bg-gray-100 transition-all">
                  <Link to="/login">Login</Link>
              </button>

                <button className="px-5 py-2 rounded-2xl bg-black text-white hover:opacity-90 transition-all">
                  <Link to="/register">Signup</Link>
              </button>
            </>
          ) : (
            <button className="px-5 py-2 rounded-2xl bg-red-500 text-white hover:opacity-90 transition-all" onClick={logoutUser}>
              Logout
            </button>
          )}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;