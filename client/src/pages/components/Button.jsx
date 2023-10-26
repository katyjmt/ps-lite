import { StyledNextBackButtons } from "./styles/Button.styled"

export function NextBackButtons({ currentPage, handlePageChange }) {
  return (
    <>
      <StyledNextBackButtons >
        <a 
          onClick={() => handlePageChange('Home')}
        >
          Back
        </a>
        <a 
          onClick={() => handlePageChange('Login')}
        >
          Next
        </a>
      </StyledNextBackButtons>
    </>
  )
}