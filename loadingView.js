'use strict';

var React = require('react-native'),
    Dimensions = require('Dimensions')

var {width, height, scale} = Dimensions.get('window')

var {
  Image,
  Text,
  View,
  Animated
} = React;

class LoadingView extends React.Component{
  constructor(props){
    super(props)

    this.state={
      width: width*.8,
      height: width*.8,
    }
  }

  // componentDidMount(){
  //   this.state.bounceValue.setValue(1.5)
  //   Animated.spring(
  //     this.state.bounceValue,
  //     {
  //       toValue: 0.8,
  //       friction: 1
  //     }
  //   ).start()
  // }

  render(){
    var styles=this.props.styles
    return (
      <View style={styles.navigator}>
        <View style={styles.backgroundColor}>
          <Image 
            ref="image" 
            style={[styles.middleLogo]} 
            source={require('image!connect')}
          />
        </View>
      </View>
    )
  }
}
// Animated.
// {transform: [{scale: this.state.bounceValue}]}
//       bounceValue: new Animated.Value(0)

module.exports = LoadingView