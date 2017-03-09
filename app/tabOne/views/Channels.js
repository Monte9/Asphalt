import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView
} from 'react-native'

import moment from 'moment';
import SendBird from 'sendbird';
var sb = null;
var ds = null;

import { APP_ID, PULLDOWN_DISTANCE } from '../../consts';
import BackButton from '../../shared/back_button'

export default class Channels extends Component {
  static navigationOptions = {
    title: 'Channels',
    header: ({ goBack }) => {
      return {
        left: <BackButton goBack={goBack} />
      }
    }
  }

  constructor(props) {
    super(props);
    sb = SendBird.getInstance();
    this.state = {
      channelList: [],
      listQuery: sb.GroupChannel.createMyGroupChannelListQuery(),
      openChannelList: [],
      openListQuery: sb.OpenChannel.createOpenChannelListQuery(),
      editMode: false
    };
    this._getChannelList = this._getChannelList.bind(this);
    this._getOpenChannelList = this._getOpenChannelList.bind(this);
    this._onHideChannel = this._onHideChannel.bind(this);
    this._onChannelPress = this._onChannelPress.bind(this);
    this._onOpenChannelPress = this._onOpenChannelPress.bind(this);
    this._refresh = this._refresh.bind(this);
    this._channelUpdate = this._channelUpdate.bind(this);
    this._openChannelUpdate = this._openChannelUpdate.bind(this);
    this._onCreateOpenChannel = this._onCreateOpenChannel.bind(this);
  }

  componentWillMount() {
    this._getChannelList();
    this._getOpenChannelList();

    // // channel handler
    // var _SELF = this;
    // var ChannelHandler = new sb.ChannelHandler();
    // ChannelHandler.onMessageReceived = function(channel, message){
    //   _SELF._channelUpdate(channel);
    // };
    // sb.addChannelHandler('ListHandler', ChannelHandler);
  }

  _channelUpdate(channel) {
    var _SELF = this;
    var _exist = false;
    var _list = _SELF.state.channelList.map(function(ch) {
      if (channel.url == ch.url ) {
        _exist = true;
        return channel
      }
      return ch
    });
    if (!_exist) {
      _list.push(channel);
    }
    _SELF.setState({
      channelList: _list
    });
  }

  _openChannelUpdate(channel) {
    var _SELF = this;
    var _list = _SELF.state.openChannelList.map(function(ch) {
      if (channel.url == ch.url ) {
        return channel
      }
      return ch
    });
    _SELF.setState({
      openChannelList: _list
    });
  }

  _refresh(channel) {
    this._channelUpdate(channel);
  }

  _channelTitle(members) {
    var _members = [];
    members.forEach(function(user) {
      if (user.userId != sb.currentUser.userId) {
        _members.push(user);
      }
    });
    var _title = _members.map(function(elem){
      if (elem.userId != sb.currentUser.userId) {
          return elem.nickname;
      }
    }).join(",");
    _title = _title.replace(',,', ',');
    return (_title.length > 15) ? _title.substring(0, 11) + '...' : _title;
  }

  _onChannelPress(channel) {
    var _SELF = this;
    if (_SELF.state.editMode) {
      Alert.alert(
        'Group Channel Edit',
        null,
        [
          {text: 'leave', onPress: () => {
            channel.leave(function(response, error) {
              if (error) {
                console.log(error);
                return;
              }
              _SELF._onHideChannel(channel);
            });
          }},
          {text: 'hide', onPress: () => {
            channel.hide(function(response, error) {
              if (error) {
                console.log(error);
                return;
              }
              _SELF._onHideChannel(channel);
            });
          }},
          {text: 'Cancel'}
        ]
      )
    } else {
      _SELF.props.navigation.navigate('Chat', { title: channel.name, channel: channel, _onHideChannel: this._onHideChannel, refresh: _SELF._refresh })
    }
  }

  _onOpenChannelPress(channel) {
    var _SELF = this;
    channel.enter(function(response, error) {
      if (error) {
        if (error.code == 900100) {
          alert('Oops...You got banned out from this channel.');
        } else {
          alert('Enter openChannel Fail.');
        }
      }
      _SELF.props.navigation.navigate('Chat', { title: channel.name, channel: channel, refresh: _SELF._refresh })
    })
  }

  _onHideChannel(channel) {
    this.setState({channelList: this.state.channelList.filter((ch) => {
      return channel.url !== ch.url
    })}, ()=> {
      console.log("DO something here")
    });
  }

  _getChannelList() {
    var _SELF = this;
    _SELF.state.listQuery.next(function(channelList, error){
      if (error) {
        console.log(error);
        return;
      }
      _SELF.setState({channelList: _SELF.state.channelList.concat(channelList)}, () => {
        console.log("Channel list fetch successfull")
      });
    });
  }

  _getOpenChannelList() {
    var _SELF = this;
    this.state.openListQuery.next(function(response, error) {
      if (error) {
        if (response.length == 0) {
          return;
        }
        console.log('Get OpenChannel List Fail.', error);
        return;
      }

      _SELF.setState({openChannelList: _SELF.state.openChannelList.concat(response)}, () => {
        console.log("Get OpenChannel saved to state")
      });
    });
  }

  _onCreateOpenChannel() {
    this.props.navigator.push({name: 'createChannel', refresh: this._refresh});
  }

  _onGroupChannel() {
    var _SELF = this;
    if (_SELF.state.editMode) {
      Alert.alert(
        'Group Channel Event',
        null,
        [
          {text: 'Done', onPress: () => {
            _SELF.setState({editMode: false});
          }}
        ]
      )
    } else{
      Alert.alert(
        'Group Channel Event',
        null,
        [
          {text: 'Edit', onPress: () => {
            _SELF.setState({editMode: true});
          }},
          {text: 'Invite', onPress: () => {
            _SELF.props.navigator.push({name: 'inviteUser', refresh: _SELF._refresh});
          }},
          {text: 'Cancel'}
        ]
      )
    }
  }

  renderGroupChannels() {
    const { channelList } = this.state

    return channelList.map(( channel, index ) => {
      const { coverUrl, members, lastMessage, unreadMessageCount, memberCount } = channel

      return (
        <View key={index}>
          <TouchableOpacity
            style={{paddingBottom: 10, paddingTop: 10, marginRight: 10}}
            onPress={() => this._onChannelPress(channel)} >
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={styles.listIcon}>
                <Image style={styles.channelIcon} source={{uri: coverUrl.replace('http://', 'https://')}} />
              </View>
              <View style={styles.listInfo}>
                <Text style={styles.titleLabel}>{this._channelTitle(members)}</Text>
                <Text style={styles.memberLabel}>{lastMessage ? ( lastMessage.message && lastMessage.message.length > 15 ? lastMessage.message.substring(0, 11) + '...' : lastMessage.message ) : '' }</Text>
              </View>
              <View style={{flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <View style={{flex: 1}}>
                  <Text style={styles.descText}>Thur</Text>
                </View>
                <View style={{flex: 2, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{color: '#861729'}}>{unreadMessageCount}</Text>
                  <Text style={{fontSize: 9}}>unread</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <View style={styles.bottomBorder} />
        </View>
      )
    })
  }

  renderOpenChannels() {
    const { openChannelList } = this.state

    return openChannelList.map(( channel, index ) => {
      const { coverUrl, name, participantCount } = channel

      return (
        <View key={index}>
          <TouchableOpacity
            style={{paddingBottom: 10, paddingTop: 10, marginRight: 10}}
            onPress={() => this._onOpenChannelPress(channel)} >
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={styles.listIcon}>
                <Image style={styles.channelIcon} source={{uri: coverUrl.replace('http://', 'https://')}} />
              </View>
              <View style={styles.listInfo}>
                <Text style={styles.titleLabel}>{name}</Text>
                <Text style={styles.memberLabel}>{participantCount}</Text>
              </View>
              <View style={{flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <View style={{flex: 1}}>
                  <Text style={styles.descText}>Thur</Text>
                </View>
                <View style={{flex: 2, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{color: '#861729'}}>10</Text>
                  <Text style={{fontSize: 9}}>unread</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <View style={styles.bottomBorder} />
        </View>
      )
    })
  }

  sectionHeader(title) {
    return (
      <View style={styles.sectionHeaderContainer}>
        <Text style={styles.sectionHeaderTitle}>{title}</Text>
      </View>
    )
  }

  render() {
    console.log(this.state)

    return (
      <View style={styles.container}>
        <ScrollView>
          {this.sectionHeader("Direct Message")}
          {this.renderGroupChannels()}
          {this.sectionHeader("Pillow Chat")}
          {this.renderOpenChannels()}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionHeaderContainer: {
    height: 30,
    backgroundColor: 'lightgrey',
    justifyContent: 'center',
  },
  sectionHeaderTitle: {
    paddingLeft: 10,
    fontSize: 13,
    color: 'grey',
    fontWeight: 'bold'
  },
  bottomBorder: {
    height: 2,
    backgroundColor: 'lightgrey',
    marginLeft: 20,
    marginRight: 20
  },
  listIcon: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 15
  },
  channelIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  listInfo: {
    flex: 5,
    flexDirection: 'column'
  },
  titleLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#60768b',
  },
  memberLabel: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    fontSize: 14,
    fontWeight: '400',
    color: '#abb8c4',
  },
  descText: {
    fontSize: 13,
    color: 'grey'
  }
});
