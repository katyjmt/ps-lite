import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
  }

  body {
    background: ${({ theme }) => theme.colors.body};
    font-family: 'Inter', sans-serif;
    font-weight: 300;
    font-size: 1rem;
    margin: 0;
    color: #575757;
  }

  h1 {
    font-size: 32px;
    font-weight: 400;
    text-transform: uppercase;
    margin: 0px 0px 15px 0px;
  }

  p {
    margin: 15px 0px;
  }

  a {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export default GlobalStyles