import React, { Component } from 'react'
import { Router } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import { ThemeProvider } from 'styled-components'

import Layout from '../Layout'

import client from '../../gql/client'
import { history } from '../../config'

import { theme, GlobalStyle } from '../../styles'

const activeTheme = 'main'

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme[activeTheme]}>
          <Router history={history}>
            <GlobalStyle />
            <Layout />
          </Router>
        </ThemeProvider>
      </ApolloProvider>
    )
  }
}

export default App
