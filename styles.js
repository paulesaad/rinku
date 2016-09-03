'use strict';
var React = require('react-native'),
    Dimensions = require('Dimensions')

var {width, height, scale} = Dimensions.get('window')

var {
  StyleSheet,
} = React;

var styles = StyleSheet.create({
  keyboardView: {
    transform: [{translateY:-height/4}]
  },
  navigator: {
    flex: 1
  },
  backgroundColor: {
    width: width,
    height: height,
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#50A5A9',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  bodyWithTwoSwipers: {
    flex: 80,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  frontContainer: {
    width: width*.8,
    height: width*.8,
    position: 'relative',
    flexDirection: 'column'
  },
  frontLogo: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width*.8,
    height: width*.8,
    opacity: .2
  },
  middleLogo: {
    width: width*.8,
    height: width*.8,
    opacity: .2
  },
  frontTitle: {
    fontSize: width/5,
    fontFamily: "Roboto-Light",
    position: 'absolute',
    color: '#ACDF4A',
    left: -width*.05,
    top: -width*.05
  },
  slogan: {
    fontSize: 20,
    fontFamily: "Roboto-Medium",
    position: "absolute",
    color: '#ACDF4A',
    left: width*.7*.5,
    top: width*.7*.82
  },
  bodyWithOneSwiper: {
    flex: 90,
    flexDirection: 'column'
  },
  placeholderUpper: {
    flex: 15
  },
  placeholderBottom: {
    flex: 24
  },
  middleContainer: {
    flex: 60,
    flexDirection: 'column',
  },
  loginHolder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  authHeader: {
    fontSize: 46,
    color: '#ACDF4A',
    fontFamily: 'Roboto-Medium'
  },
  inputHolder: {
    flex: 2,
    marginLeft: 15
  },
  inputEntry: {
    fontSize: 30,
    fontFamily: "Roboto-Bold",
    // backgroundColor: 'rgba(49,114,117, 0.8)',
    padding: 5,
    flex: 1,
    color: 'white',
    borderBottomWidth: 3
    // textDecorationLine: 'underline',
    // textDecorationColor: 'white',
    // textDecorationStyle: 'solid'
  },
  bodyWithSwiper: {
    flex: 82,
    flexDirection: 'column'
  },
  topProfileInfo: {
    flex: 2,
    flexDirection: 'row'
  },
  topSection: {
    flex: 1,
    justifyContent: 'center'
  },
  profilePic: {
    height: 120,
    width: 120,
    borderWidth: 2,
    borderColor: '#318C90',
    borderRadius: 60
  },
  mainInputs: {
    flex: 1,
    flexDirection: 'column',
    marginVertical: height/20,
    marginRight: 5
  },
  nameInput: {
    flex: 2,
    fontSize: width/15,
    fontFamily: 'Roboto-Medium',
    color: '#198085'
  },
  companyInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Roboto-Light'
  },
  bottomProfileInfo: {
    flex: 4,
    flexDirection: 'column',
    marginBottom: height/30
  },
  updateInfoHolder: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: width/10,
    marginVertical: height/100
  },
  infoLogo: {
    width: 30,
    height: 30,
    opacity: .4
  },
  imageHolder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20
  },
  updateEntry: {
    flex: 7,
    flexDirection: 'row'
  },
  prefix: {
    fontSize: 14,
    opacity: .3,
    alignSelf: 'center',
    fontFamily: 'Roboto-Light',
  },
  input: {
    flex:1,
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    color: '#0C6468'
  },
  usersContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#83CACD'
  },
  image: {
    height: 50,
    width: 50,
    backgroundColor: 'white',
    borderRadius: 25,
    margin: 7,
    borderWidth: 1,
    borderColor: '#198085'
  },
  homeInfoContainer: {
    flex: 70,
    flexDirection: 'column',
    marginLeft: 15
  },
  name: {
    fontSize: 16,
    marginBottom: 8,
    fontFamily: "Roboto-Bold"
  },
  co: {
    fontSize:12,
    fontFamily: "Roboto-Light"
  },
  topChooseInfo: {
    flex: 1.9,
    flexDirection: 'column',
    backgroundColor: 'red'
  },
  nameAndCompany: {
    flex: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#50A5A9'
  },
  nameTop: {
    fontSize: 50,
    fontFamily: 'Roboto-Medium',
    color: 'white' 
  },
  company: {
    fontSize: 20,
    fontFamily: 'Roboto-Light',
    color: 'white'
  },
  directions: {
    fontSize: 20,
    fontFamily: 'Roboto-Bold',
    color: 'white'
  },
  instructions: {
    flex: 20,
    backgroundColor: '#318C90',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomChooseInfo: {
    flex: 3.1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#83CACD'
  },
  tileRow: {
    flex: 1,
    flexDirection: 'row'
  },
  tile: {
    width: width/3,
    height: width/3,
    borderTopWidth: 1,
    borderLeftWidth: 1
  },
  selected: {
    backgroundColor: '#0C6468'
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width/3,
    height: width/3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tileImage: {
    width: width/3*.8,
    height: width/3*.8,
    opacity: .2
  },
  highlight: {
    tintColor: '#C4F071',
    opacity: .8
  },
  noUsers: {
    fontSize: 25,
    fontFamily: 'Roboto-Medium',
    color: 'white',
    textAlign: 'center'
  },
  noData: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  navBarContainer: {
    flexDirection: 'row',
    flex: 8,
    backgroundColor: '#fff',
    paddingTop: 10,
    borderBottomWidth: 2
  },
  logo: {
    flex: 1
  },
  menuInitiator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  listLogo: {
    opacity: .2
  },
  bodyWithoutSwiper: {
    flex: 92,
    flexDirection: 'column'
  },
  menuVisible: {
    transform: [{rotate: '90deg'}]
  },
  navNameContainer: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  navName: {
    fontSize: 18,
    fontFamily: 'Roboto-Medium'
  },
  menu: {
    width: width/2,
    height: height*.80,
    flexDirection: 'column',
    position: 'absolute',
    top: 0,
    left: width,
    backgroundColor: '#83CACD'
  },
  showMenu: {
    transform: [{translateX: -width/2}]
  },
  menuTitle: {
    fontSize: 20,
    fontFamily: 'Roboto-Bold',
    color: '#0C6468'
  },
  menuItem: {
    flex: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderColor: '#50A5A9'
  },
  menuLogo: {
    width: 30,
    height: 30
  },
  notAvailable: {
    opacity: .2
  }
});

module.exports = styles