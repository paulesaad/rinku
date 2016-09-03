'use strict';
var React = require('react-native');

var {
  AppRegistry,
  ListView,
  Image,
  Navigator,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} = React;

var REMOTE = 'https://contacts-back-end.herokuapp.com'

var styles = require('./styles'),
    LoginView = require('./login'),
    LoginOnly = require('./loginOnly'),
    RegisterOnly = require('./registerOnly'),
    ProfileView = require('./profile'),
    PendingContacts = require('./pendingContacts'),
    UserListView = require('./userListView'),
    ChooseInfo = require('./chooseInfo'),
    UserProfile = require('./userProfile'),
    state = require('./state')

class AppNavigation extends React.Component{
  constructor(props){
    super(props)

    // test if user is already logged in, navigate to other screen
    // state.user().then((data)=> {
    //     if(data){
    //       this.refs.navigator.replace({id: "ProximityList", name: "Users Near You"})
    //     } else{
    //       this.refs.navigator.replace({id: "LoginView", name: "Home Screen"})
    //     }
    // })
  }

  _renderScene(route, nav){
    switch (route.id) {
      case "LoginView":
        return <LoginView navigator={nav} styles={styles} route={route}/>
      case "LoginOnly":
        return <LoginOnly navigator={nav} styles={styles} route={route}/>
      case "RegisterOnly":
        return <RegisterOnly navigator={nav} styles={styles} route={route}/>
      case "ProximityList":
        return <UserListView navigator={nav} styles={styles} route={route} viewRole={"ProximityList"}/>
      case "ProfileView":
        return <ProfileView navigator={nav} styles={styles} route={route}/>
      case "ChooseInfo":
        return <ChooseInfo navigator={nav} styles={styles} route={route}/>
      case "ContactList":
        return <UserListView navigator={nav} styles={styles} route={route} viewRole={"ContactList"}/>
      case "PendingContacts":
        return <PendingContacts navigator={nav} styles={styles} route={route}/>
      case "UserProfile":
        return <UserProfile navigator={nav} styles={styles} route={route}/>
      default:
        return null
    }
  }

  render(){
    return(
      <Navigator
        ref="navigator"
        style={styles.navigator}
        initialRoute={{id: "LoginView", name: "Home Screen"}}
        renderScene = {(route, navigator) => this._renderScene(route, navigator)}
        configureScene={(route) => {
          if (route.sceneConfig) {
            return route.sceneConfig
          }
          return Navigator.SceneConfigs.FloatFromRight
        }}
      />
    )
  }
}

AppRegistry.registerComponent('Contacts', () => AppNavigation);