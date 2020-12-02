import React from 'react'
import styled, { ThemeProvider } from 'styled-components'

import { darkTheme, lightTheme } from './themes'
import { useDarkMode } from './hooks/useDarkMode'
import { GlobalStyles } from './globalStyles'

import Home from './pages/Home'
import PictureData from './pages/PictureData'
import Favorites from './pages/Favorites'
import Clickable from './components/Clickable'
import Route, { Router, useRoute } from './hooks/useRoute'
import { FavoritesProvider } from './hooks/useFavorites'
import { PictureDataProvider } from './hooks/usePictureData'
import { ConfirmationProvider } from './hooks/useConfirmation'

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 16px;
  
  width: 100%;
  height: 70px;
  position: fixed;
  top: 0;
  background-color: ${props => props.theme.background};
`

function NavBar() {
  const [, setRoute] = useRoute()
  return (
    <Nav>
      <Clickable onClick={() => setRoute('/')}>
        Home
      </Clickable>
      <h2>
        •
      </h2>
      <Clickable onClick={() => setRoute('/favorites')}>
        Favorites
      </Clickable>
      <h2>
        •
      </h2>
      <Clickable>
        Load more
      </Clickable>
    </Nav>
  )
}

const AppContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`

const AppProviders = ({ children }) => {
  return (
    <FavoritesProvider>
      <PictureDataProvider>
        <ConfirmationProvider>
          { children }
        </ConfirmationProvider>
      </PictureDataProvider>
    </FavoritesProvider>
  )
}

function App() {
  return (
    <AppContainer>
      <AppProviders>
        <Router>
          <NavBar />

          <Route path='/' component={<Home />} />
          <Route path='/pictureData' component={<PictureData />} />
          <Route path='/favorites' component={<Favorites />} />
        </Router>
      </AppProviders>
    </AppContainer>
  )
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
