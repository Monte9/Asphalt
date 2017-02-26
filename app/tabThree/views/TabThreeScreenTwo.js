import React from 'react'
import { View, Text, ScrollView } from 'react-native'

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
      <ScrollView />
    )
  }
}
