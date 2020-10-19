import styled from 'styled-components'

const Clickable = styled.h2`
  color: dodgerblue;
  font-size: 1.5rem;
  cursor: pointer;
  user-select: none;
  
  :hover {
    filter: brightness(70%);
  }
`

export default Clickable
