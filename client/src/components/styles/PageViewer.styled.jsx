import styled from "styled-components";

export const ViewerContainer = styled.div`
  display: flex;
  flex-direction: column;

  .select-btn {
    width: 40%;
    margin: auto;
    padding: 7px 40px;
    border: 1px solid ${({ theme }) => theme.colors.text};
    font-family: 'Inter', sans-serif;
    font-weight: 400;
    font-size: 1rem;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    text-decoration: none;
    border: 1px solid #707070;
    background-color: #F8F8F8;
  }

  .select-btn:hover {
    background-color: ${({ theme }) => theme.colors.midgrey};
    cursor: pointer;
  }
`

export const Viewer = styled.div`
  display: flex;
  position: relative;
  div {
    padding: 0 2px;
  }

  button {
    position: absolute;
    bottom: 0px;
    left: 50%;
    transform: translate(-50%, -50%);
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
  width: 80%;
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

  .selected {
    background-color: ${({ theme }) => theme.colors.mediumBlue};
  }

  .added {
    border-right: 3px solid red;
  }
`