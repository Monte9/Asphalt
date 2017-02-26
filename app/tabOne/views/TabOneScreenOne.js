import React, { Component } from 'react'
import { View, Text } from 'react-native'

import { Button } from 'react-native-elements'

export default class TabOneScreenOne extends Component {
  static navigationOptions = {
    title: 'Message',
  }

  render(){
    return(
      <View style={{
        flex:1,
        alignItems:'center',
        backgroundColor: '#1C7CF3',
        justifyContent:'center'
      }}>
      <Button
        iconRight
        buttonStyle={{ borderRadius:30, backgroundColor: '#1BA1F7' }}
        icon={{ name: 'comments-o', type: 'font-awesome', size: 30 }}
        title='EXPLORE MESSAGES'
        onPress={ () => this.props.navigation.navigate('TabOneScreenTwo') } />
      </View>
    )
  }
}
