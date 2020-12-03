import React from 'react'
import styled from 'styled-components'
import Clickable from './Clickable'
import { useRoute } from '../hooks/useRoute'
import { useFavorites } from '../hooks/useFavorites'
import { usePictureData } from '../hooks/usePictureData'
import { useConfirmation } from '../hooks/useConfirmation'

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

function Card({ picture, isAddedToFavorites, onClickMoreInfo, onAddFavorite, onRemoveFavorite }) {
  const { explanation, url, hdurl, title } = picture

  return (
    <CardContainer style={{ maxWidth: 750 }}>
      <a href={hdurl} target="_blank">
        <Img src={url} />
      </a>
      <CardContent>
        <h3 style={{ fontSize: 26, marginBottom: 16 }}>
          {title}
        </h3>

        {
          isAddedToFavorites
            ? <Clickable
                style={ { fontSize: 18, fontWeight: 'normal' } }
                onClick={ onRemoveFavorite }
                >
                Remove to favorites
              </Clickable>
            : <Clickable
                style={ { fontSize: 18, fontWeight: 'normal' } }
                onClick={ onAddFavorite }
              >
                Add to favorites
              </Clickable>

        }


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

function Cards({ pictures }) {
  const [, setRoute] = useRoute()
  const [, { add, remove, isIncluded }] = useFavorites()
  const [, setPicture] = usePictureData()
  const { show } = useConfirmation()

  const handleMoreInfo = picture => {
    setRoute('/pictureData')
    setPicture(picture)
  }

  const handleAddFavorite = (picture) => {
    add(picture)
    show("ADDED!")
  }

  const handleRemoveFavorite = (picture) => {
    remove(picture)
    show("REMOVED!")
  }

  return (
    <CardsContainer>
      {
        pictures.map(picture =>
          <Card
            key={ picture.title }
            picture={ picture }
            onClickMoreInfo={ () => handleMoreInfo(picture) }
            onAddFavorite={ () => handleAddFavorite(picture) }
            isAddedToFavorites={ isIncluded(picture) }
            onRemoveFavorite={() => handleRemoveFavorite(picture)}
          />)
      }
    </CardsContainer>
  )
}

export default Cards
