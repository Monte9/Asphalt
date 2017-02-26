import { StackNavigator } from 'react-navigation'

import TabThreeScreenOne from './views/TabThreeScreenOne'
import TabThreeScreenTwo from './views/TabThreeScreenTwo'
import TabThreeScreenThree from './views/TabThreeScreenThree'

const routeConfiguration = {
  TabThreeScreenOne: { screen: TabThreeScreenOne },
  TabThreeScreenTwo: { screen: TabThreeScreenTwo },
  TabThreeScreenThree: { screen: TabThreeScreenThree },

}

const stackNavigatorConfiguration = {
  initialRoute: 'TabThreeScreenOne'
}

export const NavigatorTabThree = StackNavigator(routeConfiguration,stackNavigatorConfiguration)
