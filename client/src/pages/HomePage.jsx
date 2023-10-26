import { Link } from 'react-router-dom';

export function HomePage() {
  return (
    <>
      <h1>Customise Your Planner</h1>
      <p>Please answer some questions so we can architect the perfect planner for you.</p>
      <Link className='button'
        to={`/create`}
      >
        Get Started
      </Link>
    </>
  )
}