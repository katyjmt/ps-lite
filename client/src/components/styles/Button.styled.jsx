import styled from "styled-components"

export const StyledButton = styled.div`
  display: flex;
  margin-top: 30px;

  a {
    padding: 7px 40px;
    border: 1px solid ${({ theme }) => theme.colors.text};
    font-family: 'Inter', sans-serif;
    font-weight: 400;
    font-size: 1.125rem;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    margin: 15px 15px;
    text-decoration: none;
    border: 1px solid #707070;
    background-color: #F8F8F8;
  }
  
  a:hover {
    background-color: ${({ theme }) => theme.colors.midgrey};
    cursor: pointer;
  }
`