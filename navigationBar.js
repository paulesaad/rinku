'use strict';
var React = require('react-native');

var {
  Image,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  TouchableWithoutFeedback
} = React;

class NavigationBar extends React.Component{
	constructor(props){
		super(props)
	}

	_toggleMenu(){
		var parent = this.props.parent
		parent.setState({menuVisible: !parent.state.menuVisible})
	}

	_filterListing(){
		var parent = this.props.parent
		console.log(parent.state)
	}

	render(){
		var route = this.props.route
		var styles = this.props.styles
		var parent = this.props.parent
		return(
			<View style={styles.navBarContainer}>
				<View style={styles.logo}></View>
				<View style={styles.navNameContainer}>
					<TextInput 
						style={styles.navInput} 
						placeholder={route.name} 
						onChangeText={this._filterListing.bind(this)}
					/>
				</View>
				<TouchableWithoutFeedback onPress={this._toggleMenu.bind(this)}>
					<Image style={[styles.menuInitiator, parent.state.menuVisible && styles.menuVisible]} source={require('image!menu')} />
				</TouchableWithoutFeedback>
			</View>
		)
	}
}

module.exports = NavigationBar