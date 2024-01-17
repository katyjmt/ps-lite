import styled from "styled-components"

export const Container = styled.div`
  width: 1100px;
  max-width: 100%;
  margin: auto;
  display: flex;
  flex-direction: ${( { fd }) => fd || 'column'};
  justify-content: ${( { justify }) => justify || 'center'};
  align-items: center;
  height: ${( { h }) => h || 'auto'};
  margin-top: ${( { mt }) => mt || '0px'};
`