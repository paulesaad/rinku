'use strict';
var React = require('react-native'),
    NavigationBarWithoutSearch = require('./navigationBarWithoutSearch')

var {
  AppRegistry,
  Text,
  View
} = React;

class ContactsManager extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    var styles = this.props.styles
    return(
      <View style={styles.container}>
        <NavigationBarWithoutSearch styles={styles} route={this.props.route} />
        <View style={styles.contactLists}>
          <View style={styles.contactList}>
          </View>
          <View style={styles.contactList}>
          </View>
        </View>
      </View>
    )
  }
}