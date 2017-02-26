# Asphalt - Time to hit the road with React Native

### TODO:
- [ ] Write tests using Jest
- [ ] Use MobX for state management
- [ ] Implement React Navigation for navigation across the app
- [ ] Implement full-featured chat functionality
- [ ] Implement social login with Facebook


### React Navigation use cases:

#### Navigate back on button press:

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

#### Navigate between tab bars from views:

``` js
<TouchableOpacity
  onPress={
    () => this.props.navigation.dispatch({ type:'JUMP_TO_TAB', payload:{index:0} })
  }
  style={{
    padding:20,
    borderRadius:20,
    backgroundColor:'purple',
    marginTop:20
  }}>
  <Text>{'Go back to root tab'}</Text>
</TouchableOpacity>
```
