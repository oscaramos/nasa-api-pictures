import React from 'react'
import styled from 'styled-components'

import Cards from '../components/Cards'

import { ReactComponent as RocketIcon } from '../assets/rocket.svg'
import { usePictures } from '../hooks/usePictures'

const Loader = styled.div`
  display: flex;  
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`

function Home() {
  const [data, { isLoading }] = usePictures()

  if (isLoading) {
    return (
      <Loader>
        <RocketIcon />
      </Loader>
    )
  }

  return (
    <Cards pictures={data} />
  )
}

export default Home
