import { StyledButton } from "./styles/Button.styled"
import { Link } from "react-router-dom"

export function ButtonRoute({ route, btnLabel }) {
  return (
    <>
      <StyledButton >
        <Link to={route}>
          {btnLabel}
        </Link>
      </StyledButton>
    </>
  )
}