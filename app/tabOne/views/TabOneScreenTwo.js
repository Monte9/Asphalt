import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import BackButton from '../../shared/back_button'

export default class TabOneScreenTwo extends Component {
  static navigationOptions = {
    title: 'Message Detail',
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
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: '#1C7CF3',
      }}>
      </View>
    )
  }
}
