// src/context/AuthState.jsx
import React, { useState, useEffect } from 'react'
import authContext from './authContext'
import { useNavigate } from 'react-router-dom'

const AuthState = (props) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL

  // --- auth-related state ---
  const [token, setToken] = useState(() => localStorage.getItem('token'))
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // --- your existing state ---
  const [name, setName] = useState('Toyash')
  const [tableData, setTableData] = useState([])
  
  
  


  const authFetch = (url, options = {}) => {
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    }
    return fetch(`${BASE_URL}${url}`, { ...options, headers })
  }


  const loadUser = async () => {
    if (!token) {
      setLoading(false)
      return
    }
    try {
      setIsLoggedIn(true)
      const res = await authFetch('/api/v1/user/p/getuser')
      const data = await res.json()
      if (data.success) setUser(data.user)
    } catch (err) {
      console.error('Failed to load user:', err)
    } finally {
      setLoading(false)
    }
  }

  
  useEffect(() => {
    loadUser()
  }, [token])


  const signup = async (name, email, password) => {
    const res = await fetch(`${BASE_URL}/api/v1/user/createuser`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    })
    const data = await res.json()
    if (!data.success) {
      throw new Error(data.error || 'Signup failed')
    }
    localStorage.setItem('token', data.token)
    setToken(data.token)
    setIsLoggedIn(true)
  }


  const login = async (email, password) => {
    const res = await fetch(`${BASE_URL}/api/v1/user/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    const data = await res.json()
    if (!data.success) {
      throw new Error(data.error || 'Login failed')
    }
    localStorage.setItem('token', data.token)
    setToken(data.token)
    setIsLoggedIn(true)
  }

  // ----------------------- URL fetching ----------------

  const createUrl = async (long) => {
    if (!token) {
      setLoading(false)
      return
    }
    try {
      const res = await authFetch('/api/v1/p/urlshort', {
        method: 'POST',
        body: JSON.stringify({long})
      })
      const data = await res.json()
      setTableData((prev) => {
        return (
          [...prev, {
            id:0,
            base_url: data.Base,
            long_url: long,
            code:data.Code,
            user_id:0,
            created_at:new Date().toLocaleDateString(),
          }]
        )
      })
    } catch (err) {
      console.error('Failed to create url:', err)
    } finally {
      setLoading(false)
    }
  }

  const GetUrls = async () => {
    if (!token) {
      setLoading(false)
      return
    }
    try {
      const res = await authFetch('/api/v1/p/getuserurls',{
        method: 'POST',
      })
      const data = await res.json()
      if(data===null){
        setTableData([])
      }else{
        setTableData(data)
      }
      
    } catch (err) {
      console.error('Failed get Urls:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    console.log("thi si get")
    GetUrls()
    console.log(tableData) 
  }, [])
  





  const logout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
  }

  return (
    <authContext.Provider
      value={{
        // existing
        name,
        setName,
        tableData,
        setTableData,
        // auth
        user,
        token,
        loading,
        signup,
        login,
        logout,
        createUrl,
        isLoggedIn,
        setIsLoggedIn,
        GetUrls
      }}
    >
      {props.children}
    </authContext.Provider>
  )
}

export default AuthState
