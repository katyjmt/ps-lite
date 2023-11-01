import { StyledHeader, Logo } from "./styles/Header.styled"

import { Container } from "./styles/Container.styled"

export function Header() {
  return (
    <StyledHeader>
      <Container justify = "center"  h = "130px">
        <Logo src="./logo.svg" alt="PLANNER.STUDIO Logo" />
      </Container>
    </StyledHeader>
  )
}
