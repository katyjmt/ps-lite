import { ThemeProvider } from 'styled-components'
import GlobalStyles from './components/Global'
import './utils/dateLogic'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Outlet } from 'react-router-dom';
import { Container } from './components/styles/Container.styled'
import { Header } from './components/Header'
import { theme } from './components/styles/Theme.styled';
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
          <Container mt="40px">
            <Outlet />
          </Container>
        </>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default App
