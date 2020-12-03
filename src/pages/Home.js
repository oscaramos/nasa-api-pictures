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

const Body = styled.div`
  margin-top: 80px;
`

const ErrorMessage = styled.div`
  color: red;
`

function Home() {
  const [data, { isLoading, error }] = usePictures()

  if (isLoading) {
    return (
      <Loader>
        <RocketIcon />
      </Loader>
    )
  }

  if (error) {
    // if error TOO_MANY_REQUESTS
    if (error.status === 429) {
      return (
        <Body>
          <ErrorMessage>
            Too many requests to NASA API.
          </ErrorMessage>
          <br />
          The rate limits for the DEMO_KEY are:
          <ul>
            <li>Hourly Limit: 30 requests per IP address per hour</li>
            <li>Daily Limit: 50 requests per IP address per day</li>
          </ul>

          See more about this <a href='https://api.nasa.gov/'>here</a>
        </Body>
      )
    }

    // other errors that could happen
    return (
      <Body>
        <ErrorMessage>
          <p>Code: ${ error.status }</p>
          <p>Message: ${ error.statusText }</p>
        </ErrorMessage>
      </Body>
    )
  }

  return (
    <Cards pictures={ data } />
  )
}

export default Home
