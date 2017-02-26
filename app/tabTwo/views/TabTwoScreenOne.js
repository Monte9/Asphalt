'use strict'
import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
export default class TabTwoScreenOne extends React.Component {
  render(){
    return(
      <View style={{
        flex:1,
        backgroundColor:'yellow',
        alignItems:'center',
        justifyContent:'center'
      }}>
        <Text>{ 'Tab Two Screen One' }</Text>
        <TouchableOpacity
          onPress={ () => this.props.navigation.navigate('TabTwoScreenTwo') }
          style={{
            padding:20,
            borderRadius:20,
            backgroundColor:'blue',
            marginTop:20
          }}>
          <Text>{'Go to next screen this tab'}</Text>
        </TouchableOpacity>

      </View>
    )
  }
}
