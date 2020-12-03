import React from 'react'
import { createContext, useContext } from 'react'
import useFetch from 'react-fetch-hook'
import createTrigger from "react-use-trigger";
import useTrigger from "react-use-trigger/useTrigger";

const loadMoreRequest = createTrigger();

// NASA Api using demo key
const apiUrl = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=10'

const PicturesContext = createContext(undefined)

export function PicturesProvider({ children }) {
  const loadMoreRequestValue = useTrigger(loadMoreRequest)
  const { data, isLoading, error } = useFetch(apiUrl, {
    depends: [loadMoreRequestValue]
  })

  const loadMore = () => {
    loadMoreRequest()
  }

  return (
    <PicturesContext.Provider value={ [data, { isLoading, error, loadMore }] }>
      { children }
    </PicturesContext.Provider>
  )
}

export function usePictures() {
  const context = useContext(PicturesContext)
  if (context === undefined) {
    throw new Error('usePictures must be within a PicturesProvider')
  }
  return context
}
