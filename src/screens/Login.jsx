// src/components/Login.jsx
import authContext from '../context/authContext'
import React, { useContext, useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login}=useContext(authContext)
  useEffect(() => {
    if(localStorage.getItem('token')){
      navigate('/home')
    }
  }, [])
  

  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(email, password)
    console.log({ email, password })
    // on success:
    navigate('/home')  // or wherever you want to send the user
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
          Log in to your account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="login-email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="login-email"
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400
                         focus:outline-none focus:ring-2 text-black focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="login-password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="login-password"
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400
                         focus:outline-none focus:ring-2 text-black focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent
                       text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700
                       focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            Log In
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Dont have an account?{' '}
          <Link to="/" className="font-medium text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
