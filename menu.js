'use strict';
var React = require('react-native'),
	state = require('./state')

var {
  Image,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  TouchableWithoutFeedback
} = React;

class Menu extends React.Component{
	constructor(props){
		super(props)
	}

	_logOut(){
		var navigator = this.props.navigator
		state.user(null)
			.then(() => {
				if (navigator.getCurrentRoutes()[0].id === "LoginView"){
					navigator.popToTop()
				} else {
					navigator.popToTop()
					navigator.replace({id: "LoginView"})
				}
			})
	}

	_route(route_id, route_name){
		console.log('routing')
		this.props.navigator.push({id: route_id, name: route_name})
	}

	render(){
		var parent=this.props.parent
		var styles=this.props.styles
		return(
			<View style={[styles.menu, parent.state.menuVisible && styles.showMenu]}>
				<TouchableWithoutFeedback underlayColor={'#198085'} style={styles.touchable} onPress={this._route.bind(this, "ProfileView", "Profile")}>
					<View style={[styles.menuItem]}>
						<Text style={styles.menuTitle}>Profile</Text>
					</View>
				</TouchableWithoutFeedback>
				<TouchableWithoutFeedback underlayColor={'#198085'} style={styles.touchable} onPress={this._route.bind(this, "ProximityList", "Users Near You")}>
					<View style={[styles.menuItem]}>
						<Text style={styles.menuTitle}>Proximity List</Text>
					</View>
				</TouchableWithoutFeedback>
				<TouchableWithoutFeedback underlayColor={'#198085'} style={styles.touchable} onPress={this._route.bind(this, "ContactList", "Contacts")}>
					<View style={[styles.menuItem]}>
						<Text style={styles.menuTitle}>Contact List</Text>
					</View>
				</TouchableWithoutFeedback>
				<TouchableWithoutFeedback underlayColor={'#198085'} style={styles.touchable} onPress={this._route.bind(this, "PendingContacts", "Pending Contacts")}>
					<View style={[styles.menuItem]}>
						<Text style={styles.menuTitle}>Pending Contacts</Text>
					</View>
				</TouchableWithoutFeedback>
				<TouchableWithoutFeedback underlayColor={'#198085'} style={styles.touchable} onPress={this._logOut.bind(this)}>
					<View style={[styles.menuItem]}>
						<Text style={styles.menuTitle}>Logout</Text>
					</View>
				</TouchableWithoutFeedback>
			</View>
		)
	}
}

module.exports = Menu