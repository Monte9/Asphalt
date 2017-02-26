import React, { Component } from 'react'
import { AppRegistry } from 'react-native'

import { Provider } from 'react-redux'
import store from './app/store'

import TabBarNavigation from './app/tabBar/views/TabBarNavigation'

class Asphalt extends Component {
  render(){
    return(
      <Provider store={store}>
        <TabBarNavigation />
      </Provider>
    )
  }
}

AppRegistry.registerComponent('Asphalt', () => Asphalt)
