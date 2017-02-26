import React, { Component } from 'react'
import { View, ScrollView, Image } from 'react-native'

import { Text, List, ListItem } from 'react-native-elements'

import { sample_settings, sample_profile } from '../../shared/constants'

export default class TabThreeScreenOne extends Component {
  static navigationOptions = {
    title: 'Profile',
  }

  constructor() {
    super()
    this.state = {
      user: sample_profile
    }
  }

  renderLoading() {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  renderImage() {
    const { user } = this.state

    if(user) {
      return (
        <Image
          style={styles.avatar}
          source={{uri: this.state.user.avatar_url}}
        />
      )
    } else {
      return this.renderLoading();
    }
  }

  displayUserDetails() {
    const { user } = this.state

    if(user) {
      const { name, subtitle } = this.state.user

      return (
        <View style={styles.userDetails}>
          <Text style={styles.headingName}>{name}</Text>
          <Text style={styles.headingTitle}>{subtitle}</Text>
        </View>
      )
    } else {
      return this.renderLoading();
    }
  }

  render() {
    var _this = this;

    return (
      <View style={{ flex:1 }}>
        <View style={styles.headingContainer}>
          {this.renderImage()}
          {this.displayUserDetails()}
        </View>
        <View style={styles.bodycontainer}>
          <List>
          {
            sample_settings.map((item, index) => (
              <ListItem
                key={index}
                onPress={ () => this.props.navigation.navigate('TabThreeScreenTwo') }
                title={item.title}
                icon={{name: item.icon}} />
            ))
          }
          </List>
          <List containerStyle={{marginBottom: 10}}>
            <ListItem
              key={1}
              hideChevron={true}
              onPress={() => console.log("LOG OUT")}
              title='LOGOUT'
              titleStyle={styles.logoutText}
              icon={{name: ''}} />
          </List>
        </View>
      </View>
    )
  }
}

const styles = {
  loadingContainer: {
    marginTop: 150,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#e1e8ee',
  },
  headingContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#6296f9'
  },
  bodycontainer: {
    flex: 3,
    paddingTop: 10,
    paddingBottom: 10,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  userDetails: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  headingName: {
    color: 'white',
    fontSize: 22
  },
  headingTitle: {
    color: '#43484d',
    fontSize: 17
  },
  logoutText: {
    color: 'red',
    textAlign: 'center',
  }
}
