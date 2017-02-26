import { StackNavigator } from 'react-navigation'

import TabOneScreenOne from './views/TabOneScreenOne'
import TabOneScreenTwo from './views/TabOneScreenTwo'

const routeConfiguration = {
  TabOneScreenOne: { screen: TabOneScreenOne },
  TabOneScreenTwo: { screen: TabOneScreenTwo },
}

const stackNavigatorConfiguration = {
  initialRoute: 'TabOneScreenOne'
}

export const NavigatorTabOne = StackNavigator(routeConfiguration,stackNavigatorConfiguration)
