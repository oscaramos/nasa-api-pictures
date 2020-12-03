import React from 'react'
import styled from 'styled-components'
import Clickable from '../components/Clickable'
import { usePictureData } from '../hooks/usePictureData'
import { useFavorites } from '../hooks/useFavorites'

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const PictureContent = styled.div`
  padding: 16px;
`

const Img = styled.img`
  height: 100%;
  width: auto;
  margin: 0;
`

function PictureDataView({ title, explanation, date, hdurl, onAddFavorite, onRemoveFavorite, isAddedToFavorites}) {
  return (
    <Container>
      <PictureContent>
        <h3 style={{ fontSize: 26, marginBottom: 16, marginTop: 50 }}>
          {title}
        </h3>
        {
          isAddedToFavorites
            ? <Clickable style={{ fontSize: 18, fontWeight: 'normal' }} onClick={onRemoveFavorite}>
                Remove from favorites
              </Clickable>
            : <Clickable style={{ fontSize: 18, fontWeight: 'normal' }} onClick={onAddFavorite}>
               Add to favorites
              </Clickable>
        }

        <p style={{ fontSize: 18 }}>
          {explanation}
        </p>
        <h4>
          { date }
        </h4>
      </PictureContent>
      <a href={hdurl} target="_blank">
        <Img src={hdurl} />
      </a>
    </Container>
  )
}

function PictureData() {
  const [picture] = usePictureData()
  const [, { add, remove, isIncluded }] = useFavorites()

  const { date, explanation, hdurl, title } = picture

  return (
    <PictureDataView
      title={title}
      explanation={explanation}
      date={date}
      hdurl={hdurl}
      onAddFavorite={() => add(picture)}
      onRemoveFavorite={() => remove(picture)}
      isAddedToFavorites={isIncluded(picture)}
    />
  )
}

export default PictureData
