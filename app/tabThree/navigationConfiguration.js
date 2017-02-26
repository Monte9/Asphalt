import { StackNavigator } from 'react-navigation'

import TabThreeScreenOne from './views/TabThreeScreenOne'
import TabThreeScreenTwo from './views/TabThreeScreenTwo'

const routeConfiguration = {
  TabThreeScreenOne: { screen: TabThreeScreenOne },
  TabThreeScreenTwo: { screen: TabThreeScreenTwo },
}

const stackNavigatorConfiguration = {
  initialRoute: 'TabThreeScreenOne'
}

export const NavigatorTabThree = StackNavigator(routeConfiguration,stackNavigatorConfiguration)
