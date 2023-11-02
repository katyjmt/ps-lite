import styled from "styled-components";

export const StyledHeader = styled.header`
  width: 100%;
  background-color: ${( { theme }) => theme.colors.header };
  // padding: 20px 0;
`

export const Logo = styled.img`
  width: 150px;
  height: auto;
`