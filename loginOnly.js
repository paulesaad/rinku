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
  Image,
  Animation,
  AlertIOS
} = React;

class LoginOnly extends React.Component{
	constructor(props){
		super(props)
		this.state = {
      		email: '',
      		password: '',
      		loading: false
		}
	}

	_loginUser(){
		var {email, password} = this.state
		this.setState({loading: true})

	    state.login(email, password)
	    	.then((data) => {
	    		this.setState({loading: false})
	    		this.props.navigator.push({id: "ProximityList", name: "Users Near You"})
	    	})
	    	.catch((e) => {
	    		this.setState({loading: false})
		    	AlertIOS.alert('Login Failed', e)
		    })
	}

	_goRegister(){
		this.props.navigator.replace({id: "RegisterOnly", name: "Register", sceneConfig: Navigator.SceneConfigs.FloatFromBottom})
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
										<Text style={styles.authHeader}>Login</Text>
									</View>
									<View style={styles.inputHolder}>
										<TextInput 
											style={styles.inputEntry}
											onChangeText={(text) => this.setState({email: text})} 
											placeholder='Enter Email'
											textDecorationLine = 'underline'
    										textDecorationColor = 'white'
    										textDecorationStyle = 'solid'
										/>
										<TextInput 
											style={styles.inputEntry} 
											secureTextEntry={true}
											onChangeText={(text) => this.setState({password: text})} 
											placeholder='Enter Password'
										/>
									</View>
								</View>
								<View style={styles.placeholderBottom}>
								</View>
							</View>
							<Swiper 
								backRoute={'Home Screen'} 
								forwardRoute={'Users Near You'} 
								styles={styles} 
								innerText={"Swipe to Login"} 
								callback={this._loginUser.bind(this)}
								callback_back={this._goHome.bind(this)}
							/>
						</View>
				</View>
			)
		} else{
			return(
				<LoadingView styles={styles}/>
			)
		}
	}
}

module.exports = LoginOnly