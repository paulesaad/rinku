'use strict';
var React = require('react-native'),
	Swiper = require('./swiper'),
	state = require('./state'),
	Dimensions = require('Dimensions')

var {width, height, scale} = Dimensions.get('window')

var {
  AppRegistry,
  ListView,
  Image,
  Navigator,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  PanResponder,
  AlertIOS
} = React;

class ChooseInfo extends React.Component{
	constructor(props){
		super(props)
		this.state={
			bool_name: true,
			bool_company: true,
			bool_email: false,
			bool_phone: false,
			bool_linkedin: false,
			bool_facebook: false,
			bool_twitter: false,
			bool_skype: false,
			bool_instagram: false,
			bool_github: false,
			bool_site: false,
			name: '',
			email: '',
			phone: '',
			company: '',
			linkedin: '',
			facebook: '',
			twitter: '',
			skype: '',
			instagram: '',
			github: '',
			site: ''
		}
	}

	componentDidMount(){
		state.user().then((data) => this.setState(data))
  	}

	_toggle(key){
		var bool=key[0]
		var name=key[1]
		if(this.state[name]){
			var newState = {}
			newState[bool] = !this.state[bool]
			this.setState(newState)
		}
	}

	_checkUser(){
		state.outbound_user().then((outbound_id) => this._makeRequest(outbound_id))
	}

	_makeRequest(outbound_id){
		console.log(outbound_id)
		var {bool_name, bool_email, bool_phone, bool_company, bool_linkedin, bool_facebook, bool_twitter, bool_skype, bool_instagram, bool_github, bool_site} = this.state
	    state.requestUser(outbound_id, bool_name, bool_email, bool_phone, bool_company, bool_linkedin, bool_facebook, bool_twitter, bool_skype, bool_instagram, bool_github, bool_site)
	    	.then(() => {
	    		this.props.navigator.push({id: "ProximityList", name: 'Users Near You'})
	    	})
	    	.catch((e) => {
		    	AlertIOS.alert('Request failed', e)
		    })
	}

	_goBack(){
		this.props.navigator.pop()
	}

	render(){
		var styles = this.props.styles
		var routes = this.props.navigator.getCurrentRoutes(),
			this_route_index = routes.length-1,
			last_route = routes[this_route_index-1]
		var params=['email', 'phone', 'linkedin', 'facebook', 'twitter', 'skype', 'instagram',  'github', 'site']

		return(
			<View style={styles.container}>
				<View style={styles.topChooseInfo}>
					<View style={styles.nameAndCompany}>
						<Text style={styles.nameTop}>{this.state.name}</Text>
						<Text style={styles.company}>{this.state.company}</Text>
					</View>
					<View style={styles.instructions}>
						<Text style={styles.directions}>Select info to share:</Text>
					</View>
				</View>
				<View style={styles.bottomChooseInfo}>
					<TouchableWithoutFeedback onPress={this._toggle.bind(this, ['bool_email', 'email'])}>
						<View style={[styles.tile, !this.state.email && styles.notAvailable ]}>
							<View style={[styles.backgroundImage, this.state.bool_email && styles.selected]}>
								<Image 
									style={[styles.tileImage, {width: width/3*.7, height: width/3*.7}, this.state.bool_email && styles.highlight]} 
									source={require('image!email')}
								/>
							</View>
						</View>
					</TouchableWithoutFeedback>
					<TouchableWithoutFeedback onPress={this._toggle.bind(this, ['bool_phone', 'phone'])}>
						<View style={[styles.tile, !this.state.phone && styles.notAvailable ]}>
							<View style={[styles.backgroundImage, this.state.bool_phone && styles.selected]}>
								<Image 
									style={[styles.tileImage, {width: width/3*.9, height: width/3*.9}, this.state.bool_phone && styles.highlight]} 
									source={require('image!phone')}
								/>
							</View>
						</View>
					</TouchableWithoutFeedback>
					<TouchableWithoutFeedback onPress={this._toggle.bind(this, ['bool_linkedin', 'linkedin'])}>
						<View style={[styles.tile, !this.state.linkedin && styles.notAvailable ]}>
							<View style={[styles.backgroundImage, this.state.bool_linkedin && styles.selected]}>
								<Image 
									style={[styles.tileImage, this.state.bool_linkedin && styles.highlight]} 
									source={require('image!linkedin')}
								/>
							</View>
						</View>
					</TouchableWithoutFeedback>
					<TouchableWithoutFeedback onPress={this._toggle.bind(this, ['bool_facebook', 'facebook'])}>
						<View style={[styles.tile, !this.state.facebook && styles.notAvailable ]}>
							<View style={[styles.backgroundImage, this.state.bool_facebook && styles.selected]}>
								<Image 
									style={[styles.tileImage, this.state.bool_facebook && styles.highlight]} 
									source={require('image!facebook')}
								/>
							</View>
						</View>
					</TouchableWithoutFeedback>
					<TouchableWithoutFeedback onPress={this._toggle.bind(this, ['bool_twitter', 'twitter'])}>
						<View style={[styles.tile, !this.state.twitter && styles.notAvailable ]}>
							<View style={[styles.backgroundImage, this.state.bool_twitter && styles.selected]}>
								<Image 
									style={[styles.tileImage, this.state.bool_twitter && styles.highlight]} 
									source={require('image!twitter')}
								/>
							</View>
						</View>
					</TouchableWithoutFeedback>
					<TouchableWithoutFeedback onPress={this._toggle.bind(this, ['bool_skype', 'skype'])}>
						<View style={[styles.tile, !this.state.skype && styles.notAvailable ]}>
							<View style={[styles.backgroundImage, this.state.bool_skype && styles.selected]}>
								<Image 
									style={[styles.tileImage, {width: width/3*.7, height: width/3*.7}, this.state.bool_skype && styles.highlight]} 
									source={require('image!skype')}
								/>
							</View>
						</View>
					</TouchableWithoutFeedback>
					<TouchableWithoutFeedback onPress={this._toggle.bind(this, ['bool_instagram', 'instagram'])}>
						<View style={[styles.tile, !this.state.instagram && styles.notAvailable ]}>
							<View style={[styles.backgroundImage, this.state.bool_instagram && styles.selected]}>
								<Image 
									style={[styles.tileImage, {width: width/3*.7, height: width/3*.7}, this.state.bool_instagram && styles.highlight]} 
									source={require('image!instagram')}
								/>
							</View>
						</View>
					</TouchableWithoutFeedback>
					<TouchableWithoutFeedback onPress={this._toggle.bind(this, ['bool_github', 'github'])}>
						<View style={[styles.tile, !this.state.github && styles.notAvailable ]}>
							<View style={[styles.backgroundImage, this.state.bool_github && styles.selected]}>
								<Image 
									style={[styles.tileImage, this.state.bool_github && styles.highlight]} 
									source={require('image!github')}
								/>
							</View>
						</View>
					</TouchableWithoutFeedback>
					<TouchableWithoutFeedback onPress={this._toggle.bind(this, ['bool_site', 'site'])}>
						<View style={[styles.tile, !this.state.site && styles.notAvailable ]}>
							<View style={[styles.backgroundImage, this.state.bool_site && styles.selected]}>
								<Image 
									style={[styles.tileImage, {width: width/3*.9, height: width/3*.9}, this.state.bool_site && styles.highlight]} 
									source={require('image!site')}
								/>
							</View>
						</View>
					</TouchableWithoutFeedback>
				</View>
				<Swiper 
					backRoute={last_route.name} 
					forwardRoute={'Users Near You'} 
					styles={styles} 
					innerText={"Swipe to Share"} 
					callback={this._checkUser.bind(this)}
					callback_back={this._goBack.bind(this)}
				/>
			</View> 
		)
	}
}

module.exports = ChooseInfo