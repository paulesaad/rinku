'use strict';
var React = require('react-native'),
	UserListView = require('./userListView')

var {
  AppRegistry,
  TabBarIOS,
  ListView,
  Image,
  Navigator,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} = React;

class PendingContacts extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			selectedTab: 'inbound'
		}
	}

	render(){
		var styles = this.props.styles
		return(
			<TabBarIOS 
				style={styles.tabBar} 
				selectedTab={this.state.selectedTab}
				barTintColor={'#83CACD'}
				translucent={true}
				tintColor={'white'}
			>
				<TabBarIOS.Item
					title="Inbound"
					selected={this.state.selectedTab === 'inbound'}
					onPress={() => 
						this.setState({
							selectedTab: 'inbound'
						})
					}
				>
					<UserListView styles={styles} navigator={this.props.navigator} route={this.props.route} viewRole={"Inbound"}/>
				</TabBarIOS.Item>
				<TabBarIOS.Item
					title="Outbound"
					selected={this.state.selectedTab === 'outbound'}
					onPress={() => 
						this.setState({
							selectedTab: 'outbound'
						})
					}
				>
					<UserListView styles={styles} navigator={this.props.navigator} route={this.props.route} viewRole={"Outbound"}/>
				</TabBarIOS.Item>
			</TabBarIOS>
		)
	}
}

module.exports = PendingContacts