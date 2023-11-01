import styled from "styled-components";

export const StyledPDFDownload = styled.div`

display: flex;
flex-direction: column;
height: 60vh;
justify-content: center;

  a {
    padding: 7px 30px;
    border: 1px solid black;
    font-family: 'Inter', sans-serif;
    font-weight: 400;
    font-size: 1.125rem;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    margin: 15px 15px;
    text-decoration: none;
  }

  a:hover {
    background-color: ${({ theme }) => theme.colors.midbluebackground};
  }

`
