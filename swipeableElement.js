'use strict';
var React = require('react-native'),
  Dimensions = require('Dimensions'),
  _ = require('underscore')

var {
  StyleSheet,
  View,
  Text,
  PanResponder,
  Image,
  LayoutAnimation,
} = React

var db_main = null,
    db_under = null

var SCREEN_WIDTH = Dimensions.get('window').width
var SCREEN_HEIGHT = Dimensions.get('window').height

var SWIPE_RELEASE_POINT = 70

var styles = StyleSheet.create({
  swipeableElementWrapper: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT/10,
    flexDirection:'row',
    justifyContent:'center',
  },
  swipeableMain: {
    width: SCREEN_WIDTH,
    justifyContent: 'center'
  },
  swipeableLeft: {
    overflow: 'hidden',
    width: 0,
    alignItems: 'flex-start',
    justifyContent:'center'
  },
  swipeableRight: {
    overflow: 'hidden',
    width: 0,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  leftImage: {
    padding:10,
    alignSelf:'center',
    height: 20,
    width: 20,
  },
  rightImage: {
    padding:10,
    height: 20,
    width: 20,
  },
  leftText: {
    color:'#FFFFFF',
    padding:10,
  },
  rightText: {
    color:'#FFFFFF',
    padding:10,
  }
});

var SwipeableElement = React.createClass({

  _panResponder: {},

  _handleStartShouldSetPanResponder: function() {
    return true;
  },

  _handleMoveShouldSetPanResponder: function() {
    return true;
  },

  _handlePanResponderGrant: function() {},

  _handlePanResponderMove: function(e, gestureState) {
    if (!this.refs.mainElement) {
      return;
    }

    var dx;
    var direction = gestureState.dx > 0 ? 'right' : 'left';
    if (gestureState.dx < -150) {
      dx = -150;
    } else if (gestureState.dx > 150) {
      dx = 150;
    } else {
      dx = gestureState.dx;
    }

    var absdx = dx > 0 ? dx : -dx;
    var opacity = (absdx / SWIPE_RELEASE_POINT) * 1;
    var height = 30 + ((opacity > 1 ? 1 : opacity) * 8);
    var width = 30 + ((opacity > 1 ? 1 : opacity) * 8);
    var fontSize = 8 + ((opacity > 1 ? 1 : opacity) * 8);
    var paddingTop = 15 - ((opacity > 1 ? 1 : opacity) * 5);
    var marginHorizontal = 15 + ((opacity > 1 ? 1 : opacity) * 5);
    var text;
    var image;
    var element;
    var self = this

    var props = { width: absdx*2, opacity, };

    // !db_main && (db_main = _.debounce(() => this.refs.mainElement.setNativeProps({ left: dx }), 100))
    // db_main()

    this.refs.mainElement.setNativeProps({ left: dx })

    if (dx > 0) {
        element = this.refs.leftElement;
        props.left = absdx;
        text = this.refs.leftText;
        image = this.refs.leftImage;
      } else {
        element = this.refs.rightElement;
        props.right = absdx;
        text = this.refs.rightText;
        image = this.refs.rightImage;
      }
      text.setNativeProps({ fontSize, paddingTop })
      image.setNativeProps({ height, width, paddingTop, marginHorizontal })
      element.setNativeProps(props)

    // !db_under && (db_under = _.debounce(() => {
    //   if (dx > 0) {
    //     element = self.refs.leftElement;
    //     props.left = absdx;
    //     text = self.refs.leftText;
    //     image = self.refs.leftImage;
    //   } else {
    //     element = self.refs.rightElement;
    //     props.right = absdx;
    //     text = self.refs.rightText;
    //     image = self.refs.rightImage;
    //   }
    //   text.setNativeProps({ fontSize, paddingTop })
    //   image.setNativeProps({ height, width, paddingTop, marginHorizontal })
    //   element.setNativeProps(props)
    // }, 100))
    // db_under()

    this.setState({ dx });
  },

  _handlePanResponderEnd: function() {
    if (this.state.dx > SWIPE_RELEASE_POINT) {
      if (this.props.onSwipeRight) {
        this.props.onSwipeRight.call();
      }
    } else if (this.state.dx < -SWIPE_RELEASE_POINT) {
      if (this.props.onSwipeLeft) {
        this.props.onSwipeLeft.call();
      }
    }
    var animations = LayoutAnimation.Presets
    LayoutAnimation.configureNext(animations.easeInEaseOut);
    this.setState({dx:0,});
    this.refs.mainElement && this.refs.mainElement.setNativeProps({ left: 0 });
    this.refs.leftElement && this.refs.leftElement.setNativeProps({ width: 0, left: 0, });
    this.refs.rightElement && this.refs.rightElement.setNativeProps({ width: 0, right: 0,});
    // Reset the left/right values after the animation finishes
    // This feels hacky and I hope there's a better way to do this
    setTimeout(() => {
      this.refs.leftElement && this.refs.leftElement.setNativeProps({ left: null });
      this.refs.rightElement && this.refs.rightElement.setNativeProps({ right: null });
    }, 300);
  },

  componentWillMount: function() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
      onPanResponderGrant: this._handlePanResponderGrant,
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderRelease: this._handlePanResponderEnd,
      onPanResponderTerminate: this._handlePanResponderEnd,
    });
  },

  getInitialState: function() {
    return { dx: 0, };
  },

  render: function() {
    var rightTextStyle = this.props.swipeLeftTextColor ?
      [styles.rightText, {color: this.props.swipeLeftTextColor,}] :
      styles.rightText;

    var rightImageStyle = this.props.swipeLeftImageColor ?
      [styles.rightImage, {tintColor: this.props.swipeLeftImageColor,}] :
      styles.rightImage;

    var leftTextStyle = this.props.swipeRightTextColor ?
      [styles.leftText, {color: this.props.swipeRightTextColor,}] :
      styles.leftText;

    var leftImageStyle = this.props.swipeRightImageColor ?
      [styles.leftImage, {tintColor: this.props.swipeRightImageColor,}] :
      styles.leftImage;

    var rightElementStyle = this.props.swipeLeftBackgroundColor ?
      [styles.swipeableLeft, {backgroundColor: this.props.swipeLeftBackgroundColor}] :
      styles.swipeableLeft;

    var leftElementStyle = this.props.swipeRightBackgroundColor ?
      [styles.swipeableRight, {backgroundColor: this.props.swipeRightBackgroundColor}] :
      styles.swipeableRight;

    return (
      <View style={styles.swipeableElementWrapper}>
        <View ref={'leftElement'} style={leftElementStyle}>
          <View style={{width:SCREEN_WIDTH,flexDirection:'row',}}>
            <View style={{flex:1,}}></View>
              <Text ref={'leftText'} style={leftTextStyle}>{this.props.swipeRightTitle}</Text>
              <Image ref={'leftImage'} style={leftImageStyle} source={require('image!rightPointer')}/>
          </View>
        </View>
        <View ref={'mainElement'} style={[styles.swipeableMain, {backgroundColor: this.props.color}]} {...this._panResponder.panHandlers}>
          {this.props.component}
        </View>
        <View ref={'rightElement'} style={rightElementStyle}>
          <View style={{width:SCREEN_WIDTH,overflow:'hidden', flexDirection: 'row'}}>
            <Image ref={'rightImage'} style={rightImageStyle} source={require('image!leftPointer')}/>
            <Text ref={'rightText'} style={rightTextStyle}>{this.props.swipeLeftTitle}</Text>
          </View>
        </View>
      </View>
    );
  }
});

module.exports = SwipeableElement;