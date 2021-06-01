import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import App from './App'
import SnackBar from './SnackBar'
import { FirebaseDatabaseProvider } from '@react-firebase/database'
import store, { history } from './app/redux/store'

const app = (
  <Provider store={store}>
    <FirebaseDatabaseProvider>
      <ConnectedRouter history={history}>
        <App />
        <SnackBar />
      </ConnectedRouter>
    </FirebaseDatabaseProvider>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'))
