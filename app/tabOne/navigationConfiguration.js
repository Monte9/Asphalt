import { StackNavigator } from 'react-navigation'

import TabOneScreenOne from './views/TabOneScreenOne'
import TabOneScreenTwo from './views/TabOneScreenTwo'
import Chat from './views/Chat'
import Channels from './views/Channels'

const routeConfiguration = {
  TabOneScreenOne: { screen: TabOneScreenOne },
  TabOneScreenTwo: { screen: TabOneScreenTwo },
  Chat: { screen: Chat },
  Channels: { screen: Channels }
}

const stackNavigatorConfiguration = {
  initialRoute: 'TabOneScreenOne'
}

export const NavigatorTabOne = StackNavigator(routeConfiguration,stackNavigatorConfiguration)
