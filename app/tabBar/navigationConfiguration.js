import { TabNavigator } from 'react-navigation'

import TabOneNavigation from '../tabOne/views/TabOneNavigation'
import TabThreeNavigation from '../tabThree/views/TabThreeNavigation'

const routeConfiguration = {
  TabOneNavigation: { screen: TabOneNavigation },
  TabThreeNavigation: { screen: TabThreeNavigation },
}

const tabBarConfiguration = {
  tabBarOptions:{
    // tint color is passed to text and icons (if enabled) on the tab bar
    activeTintColor: '#A64D3B',
    inactiveTintColor: '#474E5C',
  }
}

export const TabBar = TabNavigator(routeConfiguration, tabBarConfiguration)

export const tabBarReducer = (state,action) => {
  if (action.type === 'JUMP_TO_TAB') {
    return { ...state, index: 0 }
  } else {
    return TabBar.router.getStateForAction(action,state)
  }
}
