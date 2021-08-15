import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import UserProvider from "./contexts/UserContext"
import GeneralProvider from "./contexts/GeneralContext"
import {BrowserRouter as Router} from "react-router-dom"

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <GeneralProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </GeneralProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);