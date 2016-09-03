'use strict';
var React = require('react-native'),
	Dimensions = require('Dimensions'),
	SwipeableElement = require('./swipeableElement')

var {width, height, scale} = Dimensions.get('window')

var {
  Text,
  View,
  PanResponder,
  TouchableWithoutFeedback
} = React;


class Swiper extends React.Component{
	constructor(props){
		super(props)
	}

	_handleSwipeRight(cb){
		cb()
	}

	_handleSwipeLeft(cb_back){
		cb_back()
	}

	render(){
		var styles = this.props.styles
		var callback = this.props.callback
		var callback_back = this.props.callback_back
		var titleColor = this.props.titleColor
		return(
			<SwipeableElement
				color={this.props.color ? this.props.color : "#318C90"}
	        	component={<Text style={{alignSelf: 'center', fontSize: 29, fontFamily: 'Roboto-Light', color: titleColor ? titleColor : 'white'}}>{this.props.innerText}</Text>}
	        	swipeRightTextColor={'#C4F071'}
	        	swipeRightImageColor={'#C4F071'}
	        	swipeRightBackgroundColor={'#0C6468'}
	        	swipeRightTitle={this.props.forwardRoute}
	        	swipeLeftTextColor={'#C4F071'}
	        	swipeLeftImageColor={'#C4F071'}
	        	swipeLeftBackgroundColor={'#0C6468'}
	        	swipeLeftTitle={this.props.backRoute}
	        	onSwipeRight={this._handleSwipeRight.bind(this, callback)}
	        	onSwipeLeft={this._handleSwipeLeft.bind(this, callback_back)} 
          	/>
		)
	}
}

module.exports = Swiper