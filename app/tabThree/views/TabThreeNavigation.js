import React from 'react'
import { addNavigationHelpers } from 'react-navigation'

import Icon from 'react-native-vector-icons/FontAwesome'

import { NavigatorTabThree } from '../navigationConfiguration'

export default class TabThreeNavigation extends React.Component {
  static navigationOptions = {
    tabBar:{
      label: 'Profile',
      icon: ({ tintColor }) => <Icon size={ 20 } name={ 'user-circle-o' } color={ tintColor }/>
    }
  }

 render(){
    return (
      <NavigatorTabThree />
    )
  }
}
