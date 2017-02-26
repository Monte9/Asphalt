import React from 'react'
import { connect } from 'react-redux'

import { addNavigationHelpers } from 'react-navigation'

import Icon from 'react-native-vector-icons/FontAwesome'

import { NavigatorTabThree } from '../navigationConfiguration'

const mapStateToProps = (state) => {
 return {
  navigationState: state.tabThree
  }
}
class TabThreeNavigation extends React.Component {
  static navigationOptions = {
    tabBar:{
      label: 'Profile',
      icon: ({ tintColor }) => <Icon size={ 20 } name={ 'user-circle-o' } color={ tintColor }/>
    }
  }

render(){
    const { dispatch, navigationState} = this.props
return (
      <NavigatorTabThree
        navigation={addNavigationHelpers({
          dispatch: dispatch,
          state: navigationState
        })}
      />
    )
  }
}

export default connect(mapStateToProps)(TabThreeNavigation)
