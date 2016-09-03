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

class NavigationBarWithoutSearch extends React.Component{
	constructor(props){
		super(props)
	}

	_toggleMenu(){
		var parent = this.props.parent
		parent.setState({menuVisible: !parent.state.menuVisible})
	}

	render(){
		var route = this.props.route
		var styles = this.props.styles
		var parent = this.props.parent
		return(
			<View style={styles.navBarContainer}>
				<View style={styles.logo}></View>
				<View style={styles.navNameContainer}>
					<Text style={styles.navName}>{route.name}</Text>
				</View>
				<TouchableWithoutFeedback onPress={this._toggleMenu.bind(this)}>
					<View style={styles.menuInitiator}>
						<Image 
							style={[styles.menuLogo, parent.state.menuVisible && styles.menuVisible]} 
							source={require('image!menu')} 
						/>
					</View>
				</TouchableWithoutFeedback>
			</View>
		)
	}
}

module.exports = NavigationBarWithoutSearch