import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import BackButton from '../../shared/back_button'

export default class TabThreeScreenTwo extends React.Component {
  static navigationOptions = {
    title: ({ state }) => state.params.title,
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
        justifyContent:'center'
      }}>
      </View>
    )
  }
}
