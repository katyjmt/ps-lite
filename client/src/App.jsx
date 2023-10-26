import { ThemeProvider } from 'styled-components'
import GlobalStyles from './pages/components/Global'
import './utils/dateLogic'
import { Outlet } from 'react-router-dom';
import { Container } from './pages/components/styles/Container.styled'
import { Header } from './pages/components/Header'
import { theme } from './pages/components/styles/Theme.styled';


function App() {

  return (
    <ThemeProvider theme = {theme}>
      <>
        <GlobalStyles />
        <Header />
        <Container vh = "60vh">
          <Outlet />
        </Container>
      </>
    </ThemeProvider>
  )
}

export default App
