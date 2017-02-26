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
        <TouchableOpacity
          onPress={ () => this.props.navigation.goBack() }
          style={{
            padding:20,
            borderRadius:20,
            backgroundColor:'yellow',
            marginTop:20
          }}>
          <Text>{'Go back a screen this tab'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={
            () => this.props.navigation.dispatch({ type:'JUMP_TO_TAB', payload:{index:0} })
          }
          style={{
            padding:20,
            borderRadius:20,
            backgroundColor:'deeppink',
            marginTop:20
          }}>
          <Text>{'jump to tab one'}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
