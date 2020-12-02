import React from 'react'
import Cards from '../components/Cards'
import { useFavorites } from '../hooks/useFavorites'

function Favorites() {
  const [favorites] = useFavorites()
  return (
    <Cards pictures={favorites} />
  )
}

export default Favorites
