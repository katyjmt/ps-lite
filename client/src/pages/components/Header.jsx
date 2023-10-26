import { StyledHeader, Logo } from "./styles/Header.styled"

import { Container } from "./styles/Container.styled"

export function Header() {
  return (
    <StyledHeader>
      <Container justify = "center"  vh = "25vh">
        <Logo src="./logo.svg" alt="PLANNER.STUDIO Logo" />
      </Container>
    </StyledHeader>
  )
}
