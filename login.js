'use strict';

var React = require('react-native'),
	Swiper = require('./swiper'),
	state = require('./state')

var {
  	Text,
	View,
	TextInput,
	Navigator,
	AlertIOS,
	Image
} = React;

class LoginView extends React.Component{
	constructor(props){
		super(props)
	}

	_goLogin(){
		this.props.navigator.push({id: 'LoginOnly', name: "Login", sceneConfig: Navigator.SceneConfigs.FloatFromLeft})
	}

	_goRegister(){
		this.props.navigator.push({id: 'RegisterOnly', name: "Register", sceneConfig: Navigator.SceneConfigs.FloatFromLeft})
	}

	render(){
		var styles=this.props.styles
		return(
			<View style={styles.navigator}>
			<View style={styles.backgroundColor}></View>
			<View style={styles.container}>
				<View style={styles.bodyWithTwoSwipers}>
					<View style={styles.frontContainer}>
						<Image style={styles.frontLogo} source={require('image!connect')}/>
						<Text style={styles.frontTitle}>Rinku</Text>
						<Text style={styles.slogan}>network with ease</Text>
					</View>
				</View>
				<Swiper 
					backRoute={'Login'} 
					forwardRoute={'Login'} 
					styles={styles} 
					color={"#318C90"}
					innerText={"Swipe to Login"} 
					callback={this._goLogin.bind(this)}
					callback_back={this._goLogin.bind(this)}
				/>
				<Swiper 
					backRoute={'Register'} 
					forwardRoute={'Register'} 
					styles={styles} 
					color={"#0C6468"}
					innerText={"Swipe to Register"} 
					callback={this._goRegister.bind(this)}
					callback_back={this._goRegister.bind(this)}
				/>
			</View>
			</View>
		)
	}
}

module.exports = LoginView;
