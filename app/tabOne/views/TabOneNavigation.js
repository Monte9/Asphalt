import React from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  AppState,
  Platform,
  Keyboard,
  KeyboardAvoidingView
} from 'react-native'

import { addNavigationHelpers } from 'react-navigation'
import { NavigatorTabOne } from '../navigationConfiguration'

import Icon from 'react-native-vector-icons/FontAwesome'
import SendBird from 'sendbird'

import {APP_ID} from '../../consts'
var sb = null;

export default class TabOneNavigation extends React.Component {
  static navigationOptions = {
    tabBar:{
      label: 'Message',
      icon: ({ tintColor }) => <Icon size={ 20 } name={ 'comments' } color={ tintColor }/>
    }
  }

  componentDidMount() {
    sb = new SendBird({appId: APP_ID});
    AppState.addEventListener('change', function(currentAppState){
      if (currentAppState === 'active') {
        console.log('foreground');
        sb.setForegroundState();
      } else if (currentAppState === 'background') {
        console.log('background');
        sb.setBackgroundState();
      }
    });

    // var Notifications = require('react-native-push-notification');
    // Notifications.configure({
    //     onRegister: function(token) {
    //         if (Platform.OS === 'ios') {
    //           sb.registerAPNSPushTokenForCurrentUser(token['token'], function(result, error){
    //             console.log("registerAPNSPushTokenForCurrentUser");
    //             console.log(result);
    //           });
    //         } else {
    //           sb.registerGCMPushTokenForCurrentUser(token['token'], function(result, error){
    //             console.log("registerAPNSPushTokenForCurrentUser");
    //             console.log(result);
    //           });
    //         }
    //     },
    //
    //     onNotification: function(notification) {
    //         console.log( 'NOTIFICATION:', notification );
    //     },
    //
    //     // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
    //     senderID: "984140644677",
    //
    //     // IOS ONLY (optional): default: all - Permissions to register.
    //     permissions: {
    //         alert: true,
    //         badge: true,
    //         sound: true
    //     },
    //
    //     // Should the initial notification be popped automatically
    //     // default: true
    //     popInitialNotification: true,
    //
    //     /**
    //       * (optional) default: true
    //       * - Specified if permissions (ios) and token (android and ios) will requested or not,
    //       * - if not, you must call PushNotificationsHandler.requestPermissions() later
    //       */
    //     requestPermissions: true,
    // });
  }

  render(){
    return (
      <NavigatorTabOne />
    )
  }
}
