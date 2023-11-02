import styled from "styled-components"

export const StyledSignupLogin = styled.div`
  display: flex;
  margin-top: 50px;

  form {
    display: flex;
    flex-direction: column;
  }

  form input {
    width: 300px;
    height: 40px;
    background-color: #F1F9FF;
    color: #2699FB;
    border-radius: 10px;
    border: 2px solid #BCE0FD;
    padding: 10px;
    margin: 5px 15px;
  }

  button {
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
`