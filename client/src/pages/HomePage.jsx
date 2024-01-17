import { ButtonRoute } from '../components/ButtonRoute';
import { Container } from '../components/styles/Container.styled';
import { StyledHomePage } from '../components/styles/HomePage.styled';


export function HomePage() {

  return (
    <Container>
      <StyledHomePage>
        <h1>Customise Your Planner</h1>
        <p>Please answer some questions so we can create the perfect planner for you.</p>
        <img src="./planner-hero-floral.jpg" alt="hero image" width="900px"/>
        <ButtonRoute route="/create" btnLabel="Get Started"/>
      </StyledHomePage>
    </Container>
  )
}