import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import auth from '../../auth/store/reducer'
import Attendence from './attendence.reducer'
import notification from '../../notification/store/reducers'
import Payment from './payment.reducer'
import Supports from './support.reducer'
import Chat from './chat.reducer'
import Report from './report.reducer'

const createRootReducer = (history) =>
  combineReducers({
    auth,
    notification,
    Attendence,
    Payment,
    Supports,
    Report,
    Chat,
    router: connectRouter(history),
  })

export default createRootReducer
