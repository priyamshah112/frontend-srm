import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import {
  connectRouter,
  routerMiddleware,
  ConnectedRouter,
} from "connected-react-router";
import { createBrowserHistory } from "history";

import App from "./App";
import authReducer from "./app/auth/store/reducer";
import notificationReducer from "./app/notification/store/reducers";
import { watchAuth } from "./app/auth/store/sagas";
import { watchNotification } from "./app/notification/store/saga";
import { rootSaga } from "./rootSaga";
import AttendenceReducer from "./app/redux/reducers/attendence.reducer";
import SupportReducer from "./app/redux/reducers/support.reducer";
const composeEnhancers =
  (process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null) || compose;

export const history = createBrowserHistory();

/* Combining reducers*/
const rootReducer = combineReducers({
  auth: authReducer,
  notification: notificationReducer,
  router: connectRouter(history),
  Attendence: AttendenceReducer,
  Supports: SupportReducer,
});

/* Creating saga middleware */
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware))
);

sagaMiddleware.run(rootSaga);
// sagaMiddleware.run(watchNotification);
const app = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
