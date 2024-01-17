import GlobalStyles from '../components/Global'
import { Link } from 'react-router-dom';
import { ThemeProvider } from 'styled-components'
import { theme } from '../components/styles/Theme.styled';
import { Header } from '../components/Header';
import { Container } from '../components/styles/Container.styled';
import '../App.css'

export function ErrorPage() {
  return (
    <ThemeProvider theme = {theme}>
      <>
        <GlobalStyles />
        <Header />
        <Container vh = "60vh">
          <h1>404 - Page Not Found</h1>
          <p>Oops, it looks like you might be lost.</p>
          <Link className='button'
            to={`/`}
          >
            Go Home
          </Link>
        </Container>
      </>
    </ThemeProvider>
  )
}
