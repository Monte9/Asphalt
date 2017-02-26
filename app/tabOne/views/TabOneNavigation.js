import React from 'react'

import { addNavigationHelpers } from 'react-navigation'
import { NavigatorTabOne } from '../navigationConfiguration'

import { connect } from 'react-redux'

import Icon from 'react-native-vector-icons/FontAwesome'

const mapStateToProps = (state) => {
 return {
  navigationState: state.tabOne
  }
}

class TabOneNavigation extends React.Component {
  static navigationOptions = {
    tabBar:{
      label: 'Message',
      icon: ({ tintColor }) => <Icon size={ 20 } name={ 'comments' } color={ tintColor }/>
    }
  }

  render(){
    const { navigationState, dispatch } = this.props
    return (
      <NavigatorTabOne
        navigation={
          addNavigationHelpers({
            dispatch: dispatch,
            state: navigationState
          })
        }
      />
    )
  }
}
export default connect(mapStateToProps)(TabOneNavigation)
