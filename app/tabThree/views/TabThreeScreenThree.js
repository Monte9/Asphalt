'use strict'

import React from 'react'

import { View, Text, TouchableOpacity } from 'react-native'

export default class TabThreeScreenThree extends React.Component {
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
      </View>
    )
  }
}

const BackButton = (props) => {
  return (
    <TouchableOpacity
      onPress={ () => props.goBack() }
      style={{
        width: 30,
        height: 30,
        backgroundColor: 'red',
      }}
    />
  )
}

TabThreeScreenThree.navigationOptions = {
  title: 'Screen Three Tab 3 boom!!!!',
  header: ({ goBack }) => {
    return {
      left: <BackButton goBack={goBack} />
    }
  }
};
