import { ThemeProvider } from 'styled-components'
import GlobalStyles from './pages/components/Global'
import './utils/dateLogic'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Outlet } from 'react-router-dom';
import { Container } from './pages/components/styles/Container.styled'
import { Header } from './pages/components/Header'
import { theme } from './pages/components/styles/Theme.styled';
import './App.css';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme = {theme}>
        <>
          <GlobalStyles />
          <Header />
          <Container mt="30px">
            <Outlet />
          </Container>
        </>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default App
