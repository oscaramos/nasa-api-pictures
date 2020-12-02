import React from 'react'
import { useState, createContext, useContext } from 'react'

const FavoritesContext = createContext(undefined)

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([])

  // Add an new card to favorites list
  const add = card => {
    // If card exists then no add it again
    if (favorites.indexOf(card) !== -1) return

    setFavorites([...favorites, card])
  }

  return (
    <FavoritesContext.Provider value={ [favorites, { add }] }>
      { children }
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error('useFavorites must be within a FavoritesProvider')
  }
  return context
}
