import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import BackButton from '../../shared/back_button'

export default class TabThreeScreenThree extends React.Component {
  static navigationOptions = {
    title: 'Profile Screen 3',
    header: ({ goBack }) => {
      return {
        left: <BackButton goBack={goBack} />
      }
    }
  }

  render(){
    return(
      <View style={{
        flex:1,
        backgroundColor:'brown',
        alignItems:'center',
        justifyContent:'center'
      }}>
        <Text>{ 'Tab Three Screen Three' }</Text>
      </View>
    )
  }
}
