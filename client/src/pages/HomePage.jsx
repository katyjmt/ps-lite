import { Link } from 'react-router-dom';

import { Container } from './components/styles/Container.styled';

export function HomePage() {

  return (
    <Container>
      <h1>Customise Your Planner</h1>
      <p>Please answer some questions so we can architect the perfect planner for you.</p>
      <Link className='button'
        to={`/create`}
      >
        Get Started
      </Link>
    </Container>
  )
}