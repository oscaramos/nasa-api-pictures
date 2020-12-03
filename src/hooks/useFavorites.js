import React from 'react'
import { useState, createContext, useContext } from 'react'

const FavoritesContext = createContext(undefined)

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([])

  // Add an new picture to favorites list
  const add = picture => {
    // If picture exists then no add it again
    if (favorites.indexOf(picture) !== -1) return

    setFavorites([...favorites, picture])
  }

  const remove = pictureToRemove => {
    setFavorites(favorites.filter(picture => picture !== pictureToRemove))
  }

  const isIncluded = (picture) => {
    return favorites.includes(picture)
  }

  return (
    <FavoritesContext.Provider value={ [favorites, { add, remove, isIncluded }] }>
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
