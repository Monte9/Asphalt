import { Platform } from 'react-native'
import { StackNavigator } from 'react-navigation'

import TabOneScreenOne from './views/TabOneScreenOne'
import TabOneScreenTwo from './views/TabOneScreenTwo'
import Chat from './views/Chat'
import Channels from './views/Channels'

const routeConfiguration = {
  TabOneScreenOne: { screen: TabOneScreenOne },
  TabOneScreenTwo: { screen: TabOneScreenTwo },
  Chat: { screen: Chat, path: 'chat/:user' },
  Channels: { screen: Channels }
}

const stackNavigatorConfiguration = {
  containerOptions: {
    // on Android, the URI prefix typically contains a host in addition to scheme
    URIPrefix: Platform.OS == 'android' ? 'pillowpro://pillowpro/' : 'pillowpro://',
  },
}

export const NavigatorTabOne = StackNavigator(routeConfiguration, stackNavigatorConfiguration)
