import styled from "styled-components";

export const StyledSelectDayLayout = styled.div`

display: flex;
justify-content: center;
width: 100%;
align-items: center;
margin: 30px 0px 0px 0px;

  div {
    border: 1px solid ${({ theme }) => theme.colors.text};
    height: 100px;
    width: 100px;
    margin: 15px;
    display: flex;
    align-items: center;
    justify-content: center; 
    background-color: ${({ theme }) => theme.colors.bluebackground}
  }

  div:hover, .selected {
    background-color: ${({ theme }) => theme.colors.mediumBlue}
  }

`