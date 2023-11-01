import { StyledNextBackButtons } from "./styles/Button.styled"

export function NextBackButtons({ previousPage, nextPage, handlePageChange }) {
  return (
    <>
      <StyledNextBackButtons >
        <a 
          onClick={() => handlePageChange(previousPage)}
        >
          Back
        </a>
        <a 
          onClick={() => handlePageChange(nextPage)}
        >
          Next
        </a>
      </StyledNextBackButtons>
    </>
  )
}