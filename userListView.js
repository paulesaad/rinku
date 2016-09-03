'use strict';

var React = require('react-native'),
    NavigationBarWithoutSearch = require('./navigationBarWithoutSearch'),
    Menu = require('./menu'),
    SwipeableElement = require('./swipeableElement'),
    LoadingView = require('./loadingView'),
    state = require('./state')

var {
  AppRegistry,
  Navigator,
  ListView,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} = React;

//currentLocation: {lat: xx, lng: xx}
class UserListView extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}), 
      loaded: false,
      menuVisible: false,
      currentView: this.props.viewRole,
      loader: null
    }
  }

  componentDidMount(){
    switch (this.state.currentView) {
      case "ProximityList":
        this._getNearbyUsers()
        break
      case "ContactList":
        this._getContacts()
        break
      case "Inbound":
        this._getInboundPendingContacts()
        break
      case "Outbound":
        this._getOutboundPendingContacts()
        break
    }
  }

  //not doing anything right now
  componentWillUnmount(){
    if(this.state.currentView === "ProximityList")
      navigator.geolocation.clearWatch(this.id)
  }

  _getContacts(){
    var {dataSource} = this.state

    state.contactList(dataSource).then((data) => this.setState(data))
  }

  _getNearbyUsers(){
    var {dataSource} = this.state

    state.proximityList(dataSource).then((data) => this.setState(data))
    
    navigator.geolocation.watchPosition(
      (position) => {
        console.log('Position has changed')
        state.user_location({
            lat: position.coords.latitude, 
            lng: position.coords.longitude
        })
        .then(() => state.proximityList(dataSource))
        .then((data) => this.setState(data))
        // .catch((...a) => console.log(...a))        
      },
      (error) => console.log(error.message),
      {enableHighAccuracy: true}
    )
  }

  _getInboundPendingContacts(){
    var {dataSource} = this.state

    state.inboundContacts(dataSource).then((data) => this.setState(data))
  }

  _getOutboundPendingContacts(){
    var {dataSource} = this.state
    
    state.outboundContacts(dataSource).then((data) => this.setState(data))
  }

  _selectUser(user){
    state.outbound_user(user.id)
    this.props.navigator.push({id: "ChooseInfo"})
  }

  _seeUserProfile(user){
    state.connected_user(user.id)
    this.props.navigator.push({id: "UserProfile", name: `${user.name}'s Info`})
  }

  _shareBack(user){
    state.outbound_user(user.id)
    this.props.navigator.push({id: "ChooseInfo"})
  }

  _handleSwipeUser(user){
    switch (this.state.currentView) {
      case "ProximityList":
        this._selectUser(user)
        break
      case "ContactList":
        this._seeUserProfile(user)
        break
      case "Inbound":
        this._shareBack(user)
        break
      case "Outbound":
        break
    }
  }

  _deleteContact(user){
    var {dataSource} = this.state
    state.deleteContact(user.id, dataSource)
    .then((data) => this.setState(data))
    .catch((e) => AlertIOS.alert('Delete Failed', e))
  }

  _denyRequest(user){
    var {dataSource} = this.state
    state.denyRequest(user.id, dataSource)
    .then((data) => this.setState(data))
    .catch((e) => {
      AlertIOS.alert('Deny Failed', e)
    })
  }

  _cancelRequest(user){
    var {dataSource} = this.state
    state.cancelRequest(user.id, dataSource)
    .then((data) => this.setState(data))
    .catch((e) => {
      AlertIOS.alert('Cancel Failed', e)
    })
  }

  _handleSwipeLeft(user){
    switch (this.state.currentView) {
      case "ProximityList":
        this._selectUser(user)
        break
      case "ContactList":
        this._deleteContact(user)
        break
      case "Inbound":
        this._denyRequest(user)
        break
      case "Outbound":
        this._cancelRequest(user)
        break
    }
  }

  _leftTitle(user){
    switch (this.state.currentView) {
      case "ProximityList":
        return `Request User`  
      case "ContactList":
        return `See User's Profile`
      case "Inbound":
        return `Respond to Request`
      case "Outbound":
        return `nuthin yet....`
    }
  }

  _rightTitle(user){
    switch (this.state.currentView) {
      case "ProximityList":
        return `Request User`  
        break
      case "ContactList":
        return `Delete Contact`
        break
      case "Inbound":
        return `Decline Request`
        break
      case "Outbound":
        return `Cancel Request`
        break
    }
  }

  _renderLoadingView() {
    var styles=this.props.styles
    return (
      <LoadingView styles={styles}/>
    )
  }

  _renderUser(user, sectionId, rowId) {
  	var styles = this.props.styles
    return (
      <SwipeableElement 
        component={
          <View style={styles.usersContainer}>
            <Image style={styles.image} source={{uri: `${user.avatar}`}}/>
            <View style={styles.homeInfoContainer}>
              <Text style={styles.name}> {user.name} </Text>
              <Text style={styles.co}> {user.company || "Evaluating their options..."} </Text>
            </View>
          </View>
        }
        swipeRightTextColor={'#C4F071'}
        swipeRightImageColor={'#C4F071'}
        swipeLeftTextColor={'#C4F071'}
        swipeLeftImageColor={'#C4F071'}
        swipeRightBackgroundColor={'#0C6468'}
        swipeLeftBackgroundColor={'#0C6468'}
        color={rowId%2===1 ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, .6)'}
        swipeRightTitle={this._leftTitle.call(this, user)}
        swipeLeftTitle={this._rightTitle.call(this, user)}
        onSwipeRight={this._handleSwipeUser.bind(this, user)}
        onSwipeLeft={this._handleSwipeLeft.bind(this, user)}
      />
    );
  }

  render() {
  	var styles = this.props.styles
    if (!this.state.loaded) {
      return this._renderLoadingView();
    }

    return (
      <View style={styles.navigator}>
        <View style={styles.backgroundColor}>
          <Image style={styles.listLogo} source={require('image!connect')}/>
        </View>
        <View style={styles.container}>
          <NavigationBarWithoutSearch styles={styles} parent={this} route={this.props.route}/>
          <View style={styles.bodyWithoutSwiper}>
            {this.state.dataSource._cachedRowCount > 0 &&  
              <ListView
                dataSource={this.state.dataSource}
                renderRow={this._renderUser.bind(this)}
                style={styles.navigator}
                automaticallyAdjustContentInsets={false}
              />
            }
            {this.state.dataSource._cachedRowCount === 0 && 
              <View style={styles.noData}>
                <Text style={styles.noUsers}>No Contacts Available</Text>
              </View>
            } 
            <Menu styles={styles} navigator={this.props.navigator} parent={this}/>
          </View>
        </View>
      </View>
    )
  }
}

module.exports = UserListView