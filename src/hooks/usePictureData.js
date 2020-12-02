import React from 'react'
import { useState, createContext, useContext } from 'react'

const PictureDataContext = createContext(undefined)

export function PictureDataProvider({ children }) {
  const [picture, setPicture] = useState([])

  return (
    <PictureDataContext.Provider value={ [picture, setPicture] }>
      { children }
    </PictureDataContext.Provider>
  )
}

export function usePictureData() {
  const context = useContext(PictureDataContext)
  if (context === undefined) {
    throw new Error('usePictureData must be within a PictureDataProvider')
  }
  return context
}
