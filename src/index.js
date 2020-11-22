import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import {
	connectRouter,
	routerMiddleware,
	ConnectedRouter,
} from 'connected-react-router'
import { createBrowserHistory } from 'history'
import App from './App'
import authReducer from './app/auth/store/reducer'
import notificationReducer from './app/notification/store/reducers'
import chatReducer from './app/chatUsers/store/reducers'
import { rootSaga } from './rootSaga'
import AttendenceReducer from './app/redux/reducers/attendence.reducer'
import SupportReducer from './app/redux/reducers/support.reducer'
import SnackBar from './SnackBar'

if (process.env.NODE_ENV === 'production') {
	console.log = function () {}
}

const composeEnhancers =
	(process.env.NODE_ENV === 'development'
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		: null) || compose

export const history = createBrowserHistory()

console.log('Console log check')

/* Combining reducers*/
const rootReducer = combineReducers({
	auth: authReducer,
	notification: notificationReducer,
	router: connectRouter(history),
	Attendence: AttendenceReducer,
	Supports: SupportReducer,
	Chat: chatReducer,
})

/* Creating saga middleware */
const sagaMiddleware = createSagaMiddleware()

const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware))
)

sagaMiddleware.run(rootSaga)
const app = (
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<App />
			<SnackBar />
		</ConnectedRouter>
	</Provider>
)

ReactDOM.render(app, document.getElementById('root'))
