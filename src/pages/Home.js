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

function Card({ imgSrc, title, description }) {
  return (
    <CardContainer style={{ maxWidth: 750 }}>
      <Img src={imgSrc} />
      <CardContent>
        <h3 style={{ fontSize: 26, marginBottom: 16 }}>
          {title}
        </h3>
        <Clickable style={{ fontSize: 18, fontWeight: 'normal' }}>
          Add to favorites
        </Clickable>
        <p style={{ fontSize: 18 }}>
          {description}
        </p>
      </CardContent>
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

  if (isLoading) {
    return (
      <Loader>
        <RocketIcon />
      </Loader>
    )
  }

  return (
    <HomeContainer>
      <NavBar />
      <CardsContainer>
      {
        data.map(item =>
          item.media_type !== 'image' ? null : (
            <Card
              key={item.title}
              title={item.title}
              imgSrc={item.url}
              description={item.explanation}
            />
          ))
      }
      </CardsContainer>
      <SavedConfirmation hidden />
    </HomeContainer>
  )
}

export default Home
