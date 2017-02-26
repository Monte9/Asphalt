import React from 'react'
import { View, Text } from 'react-native'

import { Icon } from 'react-native-elements'

export default class BackButton extends React.Component {
  render() {
    return (
      <Icon
        name='chevron-left'
        type='font-awesome'
        size={16}
        containerStyle={{width: 40, height: 40}}
        underlayColor='transparent'
        color='#000'
        onPress={ () => this.props.goBack() } />
    )
  }
}
