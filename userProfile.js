'use strict';
var React = require('react-native'),
	NavigationBarWithoutSearch = require('./navigationBarWithoutSearch'),
	Menu = require('./menu'),
	Swiper = require('./swiper'),
	state = require('./state'),
	Communications = require('./AKCommunications')

var {
  Image,
  Text,
  View,
  TextInput,
  AlertIOS,
  TouchableHighlight,
  TouchableOpacity
} = React;

class UserProfileBody extends React.Component{
	constructor(props){
		super(props)
	}

	_prefixedInput(param){
		switch(param){
			case 'linkedin':
				return 'linkedin.com/in/'
			case 'facebook':
				return 'facebook.com/'
			case 'twitter':
			case 'instagram':
				return '@'
			case 'github':
				return 'github.com/'
			default:
				return ''
		}
	}

	_parsePhone(str){
		return str.replace('.', '').replace('.', '')
	}

	_contactLink(val){
		var parent=this.props.parent
		switch(val){
			case 'email':
				Communications.email([parent.state[val]], null, null, null, null)
				break
			case 'phone':
				Communications.phonecall(this._parsePhone.call(this, parent.state[val]), true)
				break
			case 'linkedin':
				Communications.phonecall(parent.state[val], true)
				break
			case 'facebook':
				Communications.phonecall(parent.state[val], true)
				break
			case 'twitter':
				Communications.phonecall(parent.state[val], true)
				break
			case 'skype':
				Communications.phonecall(parent.state[val], true)
				break
			case 'instagram':
				Communications.phonecall(parent.state[val], true)
				break
			case 'github':
				Communications.phonecall(parent.state[val], true)
				break
		}
	}

	render(){
		var parent=this.props.parent
		var styles=this.props.styles
		var params = ['email', 'phone', 'linkedin', 'facebook', 'twitter', 'skype', 'instagram', 'github', 'site'].reduce((a, v) => {
			if (!!parent.state[v]) a.push(v)
			return a
		} ,[])
		return (
			<View style={styles.bodyWithSwiper}>
				<View style={styles.topProfileInfo}>
					<View style={[styles.topSection, {alignItems: 'center'}]}>
						<Image 
							style={styles.profilePic} 
							source={{uri: `${parent.state.avatar}`}} 
						/>
					</View>
					<View style={styles.topSection}>
						<View style={styles.mainInputs}>
							<TextInput style={styles.nameInput}
								multiline={true} 
								value={parent.state.name}
								editable={false}
							/>
							<TextInput style={styles.companyInput} 
								editable={false}
								onChangeText={(text) => this.temps.company = text}
								value={parent.state.company}
							/>
						</View>
					</View>
				</View>
				<View style={styles.bottomProfileInfo}>
					{params.map((v, i, arr) => 
						<TouchableOpacity onPress={this._contactLink.bind(this, v)}>
						<View style={styles.updateInfoHolder}>
							<View style={styles.imageHolder}>
								<Image 
									style={styles.infoLogo}
									source={require(`image!${v}`)}
								/>
							</View>
							<View style={styles.updateEntry}>
								<Text style={styles.prefix}>{this._prefixedInput.call(this, v)}</Text>
								<TextInput style={styles.input} 
									editable={false}
									value={parent.state[v]}
								/>
							</View>
						</View>
						</TouchableOpacity>
					)}
				</View>
				<Menu styles={styles} navigator={this.props.navigator} parent={parent} />
			</View>
		)
	}
}

//<TouchableHighlight onPress={() => Communications.phonecall(parent.state[v], true)}>
//<TouchableHighlight onPress={this._contactLink.call(this, v)}>

class UserProfile extends React.Component{
	constructor(props){
		super(props)

		this.state={
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
			site: '',
			avatar: ''
		}
	}

	componentDidMount(){
		state.connected_user()
		.then((other_id) => state.contactProfile(other_id))
		.then((responseData) => {
			this.setState(responseData.user)
		})
		.catch((e) => {
	    	AlertIOS.alert('Update Failed', e)
		})
	}

	_returnToContacts(){
		this.props.navigator.pop()
	}

	render(){
		var styles = this.props.styles
		var routes = this.props.navigator.getCurrentRoutes(),
			this_route_index = routes.length-1,
			last_route = routes[this_route_index-1]
		return(
			<View style={styles.container}>
				<NavigationBarWithoutSearch styles={styles} route={this.props.route} parent={this}/>
				<UserProfileBody navigator={this.props.navigator} styles={styles} parent={this}/>
				<Swiper 
					backRoute={last_route.name} 
					forwardRoute={last_route.name} 
					styles={styles} 
					innerText={"Swipe to Return"} 
					callback={this._returnToContacts.bind(this)}
					callback_back={this._returnToContacts.bind(this)}
				/>
			</View>
		)
	}
}

module.exports = UserProfile;