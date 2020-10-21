import React, { useState } from 'react'
import { ThemeProvider } from 'styled-components'

import { darkTheme, lightTheme } from './themes'
import { useDarkMode } from './hooks/useDarkMode'
import { GlobalStyles } from './globalStyles'

import Home from './pages/Home'
import CardInfo from './pages/CardInfo'

function App() {
  const [theme] = useDarkMode()
  const themeMode = theme === 'light' ? lightTheme : darkTheme

  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyles />
      <Home />
    </ThemeProvider>
  )
}

export default App
