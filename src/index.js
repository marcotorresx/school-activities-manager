import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import GeneralProvider from "./contexts/GeneralContext"
import UserProvider from "./contexts/UserContext"
import {BrowserRouter as Router} from "react-router-dom"
import {ThemeProvider} from '@material-ui/core/styles'
import theme from './theme'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider theme={theme}>
        <GeneralProvider>
          <UserProvider>
            <App />
          </UserProvider>
        </GeneralProvider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);