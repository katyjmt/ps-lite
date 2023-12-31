import { StyledNextBackButtons } from "./styles/Button.styled"

export function NextBackButtons({ previousPage, nextPage, handlePageChange }) {
  return (
    <>
      <StyledNextBackButtons >
        <a 
          onClick={() => handlePageChange(previousPage)}
          className="back"
        >
          Back
        </a>
        <a 
          onClick={() => handlePageChange(nextPage)}
          className="next"
        >
          Next
        </a>
      </StyledNextBackButtons>
    </>
  )
}