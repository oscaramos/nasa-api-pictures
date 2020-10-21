import React from 'react'
import useFetch from "react-fetch-hook";
import styled from 'styled-components'

import { ReactComponent as RocketIcon } from '../assets/rocket.svg'
import Clickable from '../components/Clickable'

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
  return (
    <Nav>
      <Clickable>
        Favorites
      </Clickable>
      <h2>
        •
      </h2>
      <Clickable>
        Show more
      </Clickable>
    </Nav>
  )
}

const CardContainer = styled.div`
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;
  border-radius: 8px;
`

const CardContent = styled.div`
  padding: 16px;
`

const CardFooter = styled.footer`
  display: flex;
  justify-content: center;
`

const Img = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px 8px 0 0;
`

function Card({ item, onClickMoreInfo, onAddFavorite }) {
  const { explanation, url, hdurl, title } = item

  return (
    <CardContainer style={{ maxWidth: 750 }}>
      <a href={hdurl} target="_blank">
        <Img src={url} />
      </a>
      <CardContent>
        <h3 style={{ fontSize: 26, marginBottom: 16 }}>
          {title}
        </h3>
        <Clickable style={{ fontSize: 18, fontWeight: 'normal' }}>
          Add to favorites
        </Clickable>
        <p style={{ fontSize: 18 }}>
          {explanation}
        </p>
      </CardContent>
      <CardFooter>
        <Clickable
          style={{ fontSize: 16, fontWeight: 'normal' }}
          onClick={onClickMoreInfo}
        >
          More info
        </Clickable>
      </CardFooter>
    </CardContainer>
  )
}

const SavedConfirmationContainer = styled(CardContainer)`
  position: fixed;
  padding: 16px;
  bottom: 24px;
  right: 24px;
`

function SavedConfirmation({ hidden }) {
  if (hidden) {
    return null
  }

  return (
    <SavedConfirmationContainer>
      <div style={{ fontSize: 36, fontWeight: 'bold' }}>
        ADDED!
      </div>
    </SavedConfirmationContainer>
  )
}

const Loader = styled.div`
  display: flex;  
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`

const HomeContainer = styled.div`
  display: flex;  
  align-items: center;  
  flex-direction: column;
`

const CardsContainer = styled.div`
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`

// NASA Api using demo key
const apiUrl = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=10'

function Home() {
  const { isLoading, data } = useFetch(apiUrl)

  const handleMoreInfo = card => {
    setRoute('cardInfo')
    setCard(card)
  }

  return (
    <HomeContainer>
      <NavBar />
      <CardsContainer>
      {
        data.map(item =>
          <Card
            item={item}
            key={item.title}
            onClickMoreInfo={() => handleMoreInfo(item)}
            onAddFavorite={() => addFavorite(item)}
          />
        )
      }
      </CardsContainer>
      <SavedConfirmation hidden />
    </HomeContainer>
  )
}

export default Home
