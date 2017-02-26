# Asphalt - Time to hit the road with React Native

### TODO:
- [ ] Write tests using Jest
- [ ] Use MobX for state management
- [ ] Implement React Navigation for navigation across the app
- [ ] Implement full-featured chat functionality
- [ ] Implement social login with Facebook


#### Navigate back on Button Press:

``` js
<TouchableOpacity
  onPress={ () => this.props.navigation.goBack() }
  style={{
    padding:20,
    borderRadius:20,
    backgroundColor:'purple',
    marginTop:20
  }}>
  <Text>{'Go back a screen this tab'}</Text>
</TouchableOpacity>
```
