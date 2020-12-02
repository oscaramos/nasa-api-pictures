import React from 'react'
import { useState, createContext, useContext } from 'react'

const RouteContext = createContext(undefined)

export function Router({ children }) {
  const [route, setRoute] = useState('/')

  return (
    <RouteContext.Provider value={ [route, setRoute] }>
      { children }
    </RouteContext.Provider>
  )
}

export function useRoute() {
  const context = useContext(RouteContext)
  if (context === undefined) {
    throw new Error('useRoute must be within a Router')
  }
  return context
}

export default function Route({ path, component }) {
  const [route] = useRoute()

  if (route === path) {
    return component
  }

  return null
}
