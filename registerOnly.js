'use strict';

var React = require('react-native'),
	Swiper = require('./swiper'),
	LoadingView = require('./loadingView'),
	state = require('./state')

var {
  Text,
  View,
  TextInput,
  Navigator,
  AlertIOS,
  Image
} = React;

class RegisterOnly extends React.Component{
	constructor(props){
		super(props)
		this.state = {
      		newName: '',
      		newEmail: '',
			newPassword: '',
			newPassword_confirmation: '',
			keyboard: false,
			loading: false
		}
	}

	_registerUser(){
		var {newName, newEmail, newPassword, newPassword_confirmation} = this.state
		this.setState({loading: true})

		state.register(newName, newEmail, newPassword, newPassword_confirmation)
			.then(() => {
	    		this.setState({loading: false})
				this.props.navigator.push({id: "ProfileView", name: "Profile"})
			})
			.catch((e) => {
	    		this.setState({loading: false})
				AlertIOS.alert('Signup Failed', e)
			})
  	}

  	_goLogin(){
		this.props.navigator.replace({id: "LoginOnly", name: "Login", sceneConfig: Navigator.SceneConfigs.FloatFromBottom})
	}

	_goHome(){
		this.props.navigator.popToTop()
	}

	render(){
		var styles=this.props.styles
		var nav = this.props.navigator
		var routes = this.props.navigator.getCurrentRoutes(),
			this_route_index = routes.length-1,
			last_route = routes[this_route_index-1]
		if(!this.state.loading){
			return(
				<View style={styles.navigator}>
					<View style={styles.backgroundColor}>
						<Image style={styles.middleLogo} source={require('image!connect')}/>
					</View>
					<View style={styles.container}>
						<View style={styles.bodyWithOneSwiper}>
							<View style={styles.placeholderUpper}>
							</View>
							<View style={styles.middleContainer}>
								<View style={styles.loginHolder}>
									<Text style={styles.authHeader}>Register</Text>
								</View>
								<View style={styles.inputHolder}>
									<TextInput
										style={styles.inputEntry}
										onChangeText={(text) => this.setState({newName: text})}
										placeholder='Enter Name'
									/>
									<TextInput
										style={styles.inputEntry}
										onChangeText={(text) => this.setState({newEmail: text})}
										placeholder='Enter Email'
									/>
									<TextInput
										style={styles.inputEntry}
										secureTextEntry={true}
										onChangeText={(text) => this.setState({newPassword: text})}
										placeholder='Enter Password'
									/>
									<TextInput
										style={styles.inputEntry}
										secureTextEntry={true}
										onChangeText={(text) => this.setState({newPassword_confirmation: text})}
										placeholder='Confirm Password' 
									/>
								</View>
							</View>
							<View style={styles.placeholderBottom}>
							</View>
						</View>
						<Swiper 
							backRoute={last_route.name} 
							forwardRoute={'Your Profile'} 
							styles={styles} 
							innerText={"Swipe to Register"} 
							callback={this._registerUser.bind(this)}
							callback_back={this._goHome.bind(this)}
						/>
					</View>
				</View>
			)
		} else{
			return (
				<LoadingView styles={styles}/>
			)
		}
	}
}

module.exports = RegisterOnly