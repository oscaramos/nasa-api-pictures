import React, { useEffect } from 'react'
import { useState, createContext, useContext } from 'react'
import styled from 'styled-components'

const SavedConfirmationContainer = styled.div`
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;
  border-radius: 8px;
  
  position: fixed;
  padding: 16px;
  bottom: 24px;
  right: 24px;
`

function SavedConfirmation({ hidden, message }) {
  if (hidden) {
    return null
  }

  return (
    <SavedConfirmationContainer>
      <div style={{ fontSize: 36, fontWeight: 'bold' }}>
        { message }
      </div>
    </SavedConfirmationContainer>
  )
}

const SavedConfirmationContext = createContext(undefined)

export function ConfirmationProvider({ children }) {
  const [hidden, setHidden] = useState(true)
  const [message, setMessage] = useState("")

  const show = (message) => {
    setHidden(false)
    setMessage(message)
  }

  // Hidden message automatically
  useEffect(() => {
    if(hidden) return

    const timeoutID = setTimeout(() => setHidden(true), 2000)
    return () => clearTimeout(timeoutID)
  }, [hidden, message])

  return (
    <SavedConfirmationContext.Provider value={ { show } }>
      { children }
      <SavedConfirmation hidden={hidden} message={message} />
    </SavedConfirmationContext.Provider>
  )
}

export function useConfirmation() {
  const context = useContext(SavedConfirmationContext)
  if (context === undefined) {
    throw new Error('useSavedConfirmation must be within a SavedConfirmationProvider')
  }
  return context
}
