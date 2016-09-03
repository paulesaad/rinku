'use strict';
var React = require('react-native'),
	NavigationBarWithoutSearch = require('./navigationBarWithoutSearch'),
	Menu = require('./menu'),
	Swiper = require('./swiper'),
	state = require('./state'),
	Dimensions = require('Dimensions')

var {width, height, scale} = Dimensions.get('window')

var {
	Image,
	Text,
	View,
	TextInput,
	TouchableHighlight,
	AlertIOS,
	TouchableWithoutFeedback
} = React;

class ProfileBody extends React.Component{
	constructor(props){
		super(props)
		this.temps=this.props.parent.state
	}

	capitalizeFirstLetter(string){
		return string.charAt(0).toUpperCase() + string.slice(1)
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

	_parsePhone(string){
		return `${string.substr(0, 3)}.${string.substr(3,3)}.${string.substr(6, 4)}`
	}

	render(){
		var parent=this.props.parent
		var styles=this.props.styles
		var params = ['email', 'phone', 'linkedin', 'facebook', 'twitter', 'skype', 'instagram', 'github', 'site']
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
								placeholder='Name'
								multiline={true}
								onChangeText={(text) => this.temps.name = text}
								onEndEditing={() => parent.setState({name: this.temps.name})} 
								value={parent.state.name}
							/>
							<TextInput style={styles.companyInput} 
								placeholder='Company' 
								onChangeText={(text) => this.temps.company = text}
								onEndEditing={() => parent.setState({company: this.temps.company})} 
								value={parent.state.company}
							/>
						</View>
					</View>
				</View>
				<View style={styles.bottomProfileInfo}>
					{params.map((v, i, arr) => {
						return <View style={styles.updateInfoHolder}>
							<View style={styles.imageHolder}>
								<Image 
									style={styles.infoLogo}
									source={require(`image!${v}`)}
								/>
							</View>
							<View style={styles.updateEntry}>
								<Text style={styles.prefix}>{this._prefixedInput.call(this, v)}</Text>
								<TextInput 
									ref={v === 'phone' ? "textInput" : null} 
									style={styles.input} 
									placeholder = {this.capitalizeFirstLetter(v)}
									onChangeText={(text) => {
										var parsedText = (v === 'phone' ? this._parsePhone.call(this, text) : text)
										this.temps[v] = parsedText
									}}
									onEndEditing={() => {
										var updatedState = {}
										updatedState[v] = this.temps[v]
										parent.setState(updatedState)
									}} 
									value={parent.state[v]}
									onFocus={() => i>3 ? parent.setState({keyboard: true}) : ''}
									onBlur={() => parent.setState({keyboard: false})}
									keyboardType = {v === 'phone' ? 'numeric' : 'default'}
								/>
							</View>
						</View>
					})}
				</View>
				<Menu styles={styles} navigator={this.props.navigator} parent={parent} />
			</View>
		)
	}
}

class ProfileView extends React.Component{
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
			avatar: '',
			menuVisible: false,
			keyboard: false
		}
	}

	componentDidMount(){
		state.user().then((data) => {
			this.setState(data)
			this.refs.ProfileBody.temps = data
		})
  	}

	_updateInfo(){
		var {name, email, phone, company, linkedin, facebook, twitter, skype, instagram, github, site} = this.state

	    state.profileUpdate(name, email, phone, company, linkedin, facebook, twitter, skype, instagram, github, site)
	    	.then(() => {
	    		this.props.navigator.push({id: "ProximityList", name: "Users Near You"})
	    	})
	    	.catch((e) => {
	    		console.log(e)
		    	AlertIOS.alert('Update Failed', e)
		    })
	}

	_goBack(){
		var routes = this.props.navigator.getCurrentRoutes(),
			this_route_index = routes.length-1,
			last_route = routes[this_route_index-1]
		if(last_route.id=="RegisterOnly"){
			this.props.navigator.push({id: "ProximityList", name: "Users Near You"})
		} else {
			this.props.navigator.pop()
		}
	}

	render(){
		var styles = this.props.styles
		var routes = this.props.navigator.getCurrentRoutes(),
			this_route_index = routes.length-1,
			last_route = routes[this_route_index-1]
		return(
			<View style={styles.navigator}>
				<View style={[styles.container, !!this.state.keyboard && styles.keyboardView]}>
					<NavigationBarWithoutSearch styles={styles} parent={this} route={this.props.route}/>
					<ProfileBody ref="ProfileBody" styles={styles} parent={this} navigator={this.props.navigator}/>
					<Swiper 
						backRoute={last_route.id === "RegisterOnly" ? "Users Near You" : last_route.name} 
						forwardRoute={'Users Near You'} 
						styles={styles} 
						innerText={"Swipe to Update"} 
						callback={this._updateInfo.bind(this)}
						callback_back={this._goBack.bind(this)}
					/>
				</View>
			</View>
		)
	}
}

module.exports = ProfileView;
