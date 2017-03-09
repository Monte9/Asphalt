import React, { Component } from 'react'
import {
  View,
  Text,
  AppState,
  Platform,
  Keyboard,
  KeyboardAvoidingView
} from 'react-native'

import { Icon } from 'react-native-elements'

import SendBird from 'sendbird'
var sb = null;

const LoginView = Platform.select({
  ios: () => KeyboardAvoidingView,
  android: () => View,
})();

export default class TabOneScreenOne extends Component {
  static navigationOptions = {
    title: 'Message',
  }

  constructor(props) {
    super(props);
    this.state = {
      userId: 'monte9',
      username: 'monte',
      connectLabel: 'CONNECT',
      buttonDisabled: true,
      errorMessage: ''
    };
    this._onPressConnect = this._onPressConnect.bind(this);
    // this._onPressOpenChannel = this._onPressOpenChannel.bind(this);
    // this._onPressGroupChannel = this._onPressGroupChannel.bind(this)
  }

  _onPressConnect() {
    Keyboard.dismiss();

    if (!this.state.buttonDisabled) {
      this.props.navigation.navigate('Channels')
      // this._onPressDisconnect();
      return;
    }

    sb = SendBird.getInstance();
    var _SELF = this;
    sb.connect(_SELF.state.userId, function (user, error) {
      if (error) {
        _SELF.setState({
          userId: '',
          username: '',
          errorMessage: 'Login Error'
        });
        console.log(error);
        return;
      }

      // if (Platform.OS === 'ios') {
      //   if (sb.getPendingAPNSToken()){
      //     sb.registerAPNSPushTokenForCurrentUser(sb.getPendingAPNSToken(), function(result, error){
      //       console.log("APNS TOKEN REGISTER AFTER LOGIN");
      //       console.log(result);
      //     });
      //   }
      // } else {
      //   if (sb.getPendingGCMToken()){
      //     sb.registerGCMPushTokenForCurrentUser(sb.getPendingGCMToken(), function(result, error){
      //       console.log("GCM TOKEN REGISTER AFTER LOGIN");
      //       console.log(result);
      //     });
      //   }
      // }

      sb.updateCurrentUserInfo(_SELF.state.username, '', function(response, error) {
        _SELF.setState({
          buttonDisabled: false,
          connectLabel: 'DISCONNECT',
          errorMessage: ''
        });
      });
    });
  }

  // _onPressOpenChannel() {
  //   this.props.navigator.push({name: 'openChannel'});
  // }
  //
  // _onPressGroupChannel() {
  //   this.props.navigator.push({name: 'groupChannel'});
  // }

  _onPressDisconnect() {
    sb.disconnect();
    this.setState({
      userId: '',
      username: '',
      errorMessage: '',
      buttonDisabled: true,
      connectLabel: 'CONNECT'
    });
  }

  render(){
    return(
      <View style={{
        flex:1,
        backgroundColor: '#1C7CF3',
        alignItems:'center',
        justifyContent:'center',
      }}>
        <View style={{width: 300, paddingBottom: 20}}>
          <Text style={{color: 'white', fontSize: 22, fontWeight: '500', textAlign: 'center'}}>
            {this.state.buttonDisabled ? 'Click the button below to view your messages' : 'CONNECTED! \n Click below to continue'}
          </Text>
        </View>
        <Icon
          raised
          loading={true}
          name={ this.state.buttonDisabled ? 'bolt' : 'chevron-right' }
          size={35}
          type='font-awesome'
          color='#61E02B'
          containerStyle={{backgroundColor: 'white'}}
          onPress={this._onPressConnect}
          onLongPress={this._onPressDisconnect.bind(this)}/>
          <View style={{width: 200, paddingTop: 20}}>
            <Text style={{color: 'white', fontSize: 18, fontWeight: '500', textAlign: 'center'}}>
              {!this.state.buttonDisabled && '(Long press above to disconnect)'}
            </Text>
          </View>
      </View>
    )
  }
}
