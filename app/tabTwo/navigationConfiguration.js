import { StackNavigator } from 'react-navigation'

import TabTwoScreenOne from './views/TabTwoScreenOne'
import TabTwoScreenTwo from './views/TabTwoScreenTwo'

const routeConfiguration = {
  TabTwoScreenOne: { screen: TabTwoScreenOne },
  TabTwoScreenTwo: { screen: TabTwoScreenTwo },
}

const stackNavigatorConfiguration = {
  initialRoute: 'TabTwoScreenOne'
}

export const NavigatorTabTwo = StackNavigator(routeConfiguration,stackNavigatorConfiguration)
