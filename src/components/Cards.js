import React from 'react'
import styled from 'styled-components'
import Clickable from './Clickable'

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
        <Clickable
          style={{ fontSize: 18, fontWeight: 'normal' }}
          onClick={onAddFavorite}
        >
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

const CardsContainer = styled.div`
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`

function Cards({ data, onClickMoreInfo, onAddFavorite }) {
  return (
    <CardsContainer>
      {
        data.map(item =>
          <Card
            item={item}
            key={item.title}
            onClickMoreInfo={() => onClickMoreInfo(item)}
            onAddFavorite={() => onAddFavorite(item)}
          />
        )
      }
    </CardsContainer>
  )
}

export default Cards
