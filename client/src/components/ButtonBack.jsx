import { StyledButton } from "./styles/Button.styled"

export function ButtonBack({ btnLabel, handleBack }) {
  return (
    <>
      <StyledButton >
        <a 
          onClick={() => handleBack()}
          className="button"
        >
          {btnLabel}
        </a>
      </StyledButton>
    </>
  )
}