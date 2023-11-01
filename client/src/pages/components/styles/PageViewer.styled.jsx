import styled from "styled-components";


export const Viewer = styled.div`
  display: flex;
  div {
    padding: 0 2px;
  }
`

export const PageContainer = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.colors.midbluebackground};
  padding: 20px;

  div img {
    width: 100%;
    height: auto;
    // filter: drop-shadow(0px 0px 4px ${({ theme }) => theme.colors.mediumBlue});
  }
`

export const PageCards = styled.div`
  width: 60%;
  padding: 0px 0px 0px 20px;

  h3 {
    padding: 10px;
  };
  
  div {
    height: 60px;
    padding: 10px;
    margin-bottom: 5px;
    background-color: white;
  }
`