import { createGlobalStyle } from "styled-components"

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html {
  }

  body {
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.onBackground};
    transition: all 0.50s linear;
    font-family: helvetica, sans-serif;
    margin: 0;
  }
`
