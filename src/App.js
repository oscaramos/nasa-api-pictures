import React, { useState } from 'react'
import { ThemeProvider } from 'styled-components'

import { darkTheme, lightTheme } from './themes'
import { useDarkMode } from './hooks/useDarkMode'
import { GlobalStyles } from './globalStyles'

import Home from './pages/Home'
import CardInfo from './pages/CardInfo'

function App() {
  const [route, setRoute] = useState('home')
  const [card, setCard] = useState(null)

  const [favorites, setFavorites] = useState([])

  const addFavorite = card => {
    // If card is not already in favorites
    if (favorites.indexOf(card) !== -1) {
      // Push back new card to favorites
      setFavorites([...favorites, card])
    }
  }

  if (route === 'home')
    return <Home setCard={setCard} setRoute={setRoute} addFavorite={addFavorite} />
  if (route === 'card')
    return <CardInfo card={card} setRoute={setRoute} />
  return null
}

function AppWrapper() {
  const [theme] = useDarkMode()
  const themeMode = theme === 'light' ? lightTheme : darkTheme

  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyles />
      <App />
    </ThemeProvider>
  )
}

export default AppWrapper
