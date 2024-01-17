import { StyledButton } from "./styles/Button.styled"

export function Button({ btnLabel, handlePageChange }) {
  return (
    <>
      <StyledButton >
        <a 
          onClick={() => handlePageChange()}
          className="button"
        >
          {btnLabel}
        </a>
      </StyledButton>
    </>
  )
}