import { createStore, applyMiddleware, compose } from 'redux'
import createRootReducer from './reducers';
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from "history";
import { rootSaga } from './sagas/rootSaga';

const composeEnhancers =
	(process.env.NODE_ENV === 'development'
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		: null) || compose

const sagaMiddleware = createSagaMiddleware()
 
export const history = createBrowserHistory()

const store = createStore(
	createRootReducer(history),
	composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware))
)

sagaMiddleware.run(rootSaga);

export default store;