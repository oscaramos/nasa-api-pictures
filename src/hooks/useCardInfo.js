import React from 'react'
import { useState, createContext, useContext } from 'react'

const CardInfoContext = createContext(undefined)

export function CardInfoProvider({ children }) {
  const [card, setCard] = useState([])

  return (
    <CardInfoContext.Provider value={ [card, setCard] }>
      { children }
    </CardInfoContext.Provider>
  )
}

export function useCardInfo() {
  const context = useContext(CardInfoContext)
  if (context === undefined) {
    throw new Error('useCardInfo must be within a CardInfoProvider')
  }
  return context
}
