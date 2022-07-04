import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store'
import { Auth0Provider } from '@auth0/auth0-react'
import { ThemeProvider } from '@mui/material'
import theme from './theme'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <Auth0Provider
        domain='dev-ehhctnno.us.auth0.com'
        clientId='kk80m3Q2I4wIegjCFSgOJekcVC9ZgYo5'
        redirectUri={window.location.origin}
      >
        <App />
      </Auth0Provider>
    </React.StrictMode>
  </Provider>
)
