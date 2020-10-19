import React from 'react'
import { ThemeProvider } from 'styled-components'

import { darkTheme, lightTheme } from './themes'
import { GlobalStyles } from './globalStyles'

import { useDarkMode } from './hooks/useDarkMode'

function App() {
  const [theme] = useDarkMode()
  const themeMode = theme === 'light' ? lightTheme : darkTheme

  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyles />
      <div>
        Hola mundo
      </div>
    </ThemeProvider>
  );
}

export default App
