import { applyMiddleware, combineReducers, createStore } from 'redux'
import logger from 'redux-logger'

import { NavigatorTabOne } from './tabOne/navigationConfiguration'
import { NavigatorTabThree } from './tabThree/navigationConfiguration'
import { TabBar } from './tabBar/navigationConfiguration'

const middleware = () => {
  return applyMiddleware(logger())
}

export default createStore(
  combineReducers({
    tabOne: (state,action) => NavigatorTabOne.router.getStateForAction(action,state),
    tabThree: (state,action) => NavigatorTabThree.router.getStateForAction(action,state),
  }),
  middleware(),
)
