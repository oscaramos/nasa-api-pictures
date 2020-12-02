import React from 'react'
import styled from 'styled-components'
import Clickable from '../components/Clickable'
import { usePictureData } from '../hooks/usePictureData'
import { useRoute } from '../hooks/useRoute'

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const CardContent = styled.div`
  padding: 16px;
`

const Img = styled.img`
  height: 100%;
  width: auto;
  margin: 0;
`

function PictureData() {
  const [picture] = usePictureData()
  const [, setRoute] = useRoute()

  const { date, explanation, hdurl, title } = picture
  if (picture === null) {
    return null
  }

  const handleBackToHome = () => {
    setRoute('/home')
  }

  return (
    <Container>
      <CardContent>
        <Clickable style={{ fontSize: 18, fontWeight: 'normal' }} onClick={handleBackToHome}>
          Go back
        </Clickable>
        <h3 style={{ fontSize: 26, marginBottom: 16, marginTop: 50 }}>
          {title}
        </h3>
        <Clickable style={{ fontSize: 18, fontWeight: 'normal' }}>
          Add to favorites
        </Clickable>
        <p style={{ fontSize: 18 }}>
          {explanation}
        </p>
        <h4>
          { date }
        </h4>
      </CardContent>
      <a href={hdurl} target="_blank">
        <Img src={hdurl} />
      </a>
    </Container>
  )
}

export default PictureData
