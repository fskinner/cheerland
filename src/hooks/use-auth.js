import React, { useState, useContext, createContext, useMemo, useCallback } from "react"
import jwtDecode from "jwt-decode"

const authContext = createContext()

const KEY = "cheerlandToken"
const API_URL = process.env.API_URL || `http://localhost:4000/api`;

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children, value }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={value || auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => useContext(authContext);

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const initial = useMemo(() => {
    const _token = localStorage.getItem(KEY)
    const _user = _token ? JSON.parse(jwtDecode(_token).sub) : undefined
    return { token: _token, user: _user }
  }, [])

  const [user, setUser] = useState(initial.user)
  const [token, setToken] = useState(initial.token)
  
  const auth = useCallback(
    _token => {
      const _user = JSON.parse(jwtDecode(_token).sub)
      setToken(_token)
      setUser(_user)
      localStorage.setItem(KEY, JSON.stringify(_token))
    }, []
  )

  const deauth = async () => {
    await fetch(`${API_URL}/sessions`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      },
      mode: 'cors',
    })

    setToken(undefined)
    setUser(undefined)
    localStorage.removeItem(KEY)
  }
  
  // Return the user object and auth methods
  return {
    user,
    token,
    auth,
    deauth,
  };
}
