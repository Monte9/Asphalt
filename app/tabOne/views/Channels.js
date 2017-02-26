import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  Alert,
  StyleSheet
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
      editMode: false
    };
    this._getChannelList = this._getChannelList.bind(this);
    this._onHideChannel = this._onHideChannel.bind(this);
    this._refresh = this._refresh.bind(this);
    this._channelUpdate = this._channelUpdate.bind(this);
  }

  componentWillMount() {
    this._getChannelList();

    // channel handler
    var _SELF = this;
    var ChannelHandler = new sb.ChannelHandler();
    ChannelHandler.onMessageReceived = function(channel, message){
      _SELF._channelUpdate(channel);
    };
    sb.addChannelHandler('ListHandler', ChannelHandler);
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
        console.log("DO something here")
      });
    });
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
        <TouchableHighlight onPress={() => this._onChannelPress(channel)} style={styles.listItem}>
          <View style={styles.listItem}>
            <View style={styles.listIcon}>
              <Image style={styles.channelIcon} source={{uri: coverUrl.replace('http://', 'https://')}} />
            </View>
            <View style={styles.listInfo}>
              <Text style={styles.titleLabel}>{this._channelTitle(members)}</Text>
              <Text style={styles.memberLabel}>{lastMessage ? ( lastMessage.message && lastMessage.message.length > 15 ? lastMessage.message.substring(0, 11) + '...' : lastMessage.message ) : '' }</Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-end', marginRight: 10}}>
              <View style={{flex: 1, flexDirection: 'column', alignItems: 'flex-end', marginRight: 4}}>
                <Text style={{color: '#861729'}}>{unreadMessageCount}</Text>
              </View>
               <View style={{flex: 1, alignItems: 'flex-end'}}>
                 <Text style={styles.descText}>{memberCount} members</Text>
                 <Text style={styles.descText}>{(lastMessage || lastMessage.createdAt == 0) ? '-' : moment(lastMessage.createdAt).format('MM/DD HH:mm')}</Text>
               </View>
            </View>
          </View>
        </TouchableHighlight>
      )
    })
  }

  render() {
    console.log(this.state)

    return (
      <View style={styles.container}>
        <View style={styles.listContainer}>
          {this.renderGroupChannels()}
        </View>
      </View>
    )
  }
}

{/* <ListView
  enableEmptySections={true}
  onEndReached={() => this._getChannelList()}
  onEndReachedThreshold={PULLDOWN_DISTANCE}
  dataSource={this.state.dataSource}
  renderRow={(rowData) =>
    <TouchableHighlight onPress={() => this._onChannelPress(rowData)}>
      <View style={styles.listItem}>
        <View style={styles.listIcon}>
          <Image style={styles.channelIcon} source={{uri: rowData.coverUrl.replace('http://', 'https://')}} />
        </View>
        <View style={styles.listInfo}>
          <Text style={styles.titleLabel}>{this._channelTitle(rowData.members)}</Text>
          <Text style={styles.memberLabel}>{rowData.lastMessage ? ( rowData.lastMessage.message && rowData.lastMessage.message.length > 15 ? rowData.lastMessage.message.substring(0, 11) + '...' : rowData.lastMessage.message ) : '' }</Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-end', marginRight: 10}}>
          <View style={{flex: 1, flexDirection: 'column', alignItems: 'flex-end', marginRight: 4}}>
            <Text style={{color: '#861729'}}>{rowData.unreadMessageCount}</Text>
          </View>
           <View style={{flex: 1, alignItems: 'flex-end'}}>
             <Text style={styles.descText}>{rowData.memberCount} members</Text>
             <Text style={styles.descText}>{(!rowData.lastMessage || rowData.lastMessage.createdAt == 0) ? '-' : moment(rowData.lastMessage.createdAt).format('MM/DD HH:mm')}</Text>
           </View>
        </View>
      </View>
    </TouchableHighlight>
  }
/> */}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: 'red',
  },
  listContainer: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: 'green',
  },
  listItem: {
    height: 100,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'yellow',
    borderBottomWidth: 0.5,
    borderColor: '#D0DBE4',
    padding: 5
  },
  listIcon: {
    justifyContent: 'flex-start',
    paddingLeft: 10,
    paddingRight: 15
  },
  channelIcon: {
    width: 30,
    height: 30
  },
  listInfo: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  titleLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#60768b',
  },
  memberLabel: {
    fontSize: 13,
    fontWeight: '400',
    color: '#abb8c4',
  },
  descText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#ababab'
  }
});
