let React = require('react-native')
var {AsyncStorage, Text, View, TextInput} = React

/**
 * @example
 * var person = prop({name: 'Matt'})
 * person() --> {name: 'Matt'}
 * prop({name: 'Paul'}) --> {name: 'Paul'}
 * prop() --> {name: 'Paul'}
 */

// function clone(val){
// 	if(typeof val === 'undefined') return val
// 	return JSON.parse(JSON.stringify(val))
// }

function prop(key, initialData){
	if(typeof val !== "undefined"){
		AsyncStorage.setItem(key, initialData)	
	}
	return function(val){
		//If an argument is passed, set a new key-value in storage. If no valid argument is passed, get the key-value pair.
		if(typeof val !== "undefined") {
			// every value in val must be a string
			return AsyncStorage.setItem(key, JSON.stringify(val))
		}
		return AsyncStorage.getItem(key).then((data) => JSON.parse(data))
	}
}

const REMOTE = 'https://contacts-back-end.herokuapp.com'

function get_location(){
	new Promise((res, rej) => 
		navigator.geolocation.getCurrentPosition(
			(position) => {
				console.log(position) 
				res({
					lat: position.coords.latitude, 
					lng: position.coords.longitude
				})
			},
			(error) => console.log('cant get initial location'),
			{enableHighAccuracy: false}
	))
}

function fetch_updateLocation(){
	promises=[state.user(), state.user_location()]

	return Promise.all(promises)
		.then((res) => {
			return fetch(`${REMOTE}/update.json`, {
		        method: 'post',
		        headers: {
		            'Accept': 'application/json',
		            'Content-Type': 'application/json'
		        },
		        body: JSON.stringify({
		            id: res[0].id,
		            user: {
		                lat: res[1].lat,
		                lng: res[1].lng
		            }
		        })
		    }).then((response) => {
		        if (response.status > 399) throw 'Could not update location!'
		    })		
		})
}

function fetch_login(email, password) {
    return fetch(`${REMOTE}/login.json`, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: {
                email: email,
                password: password
            }
        })
    }).then((response) => {
        if (response.status > 399) throw 'That email/password combination does not exist. Try again!'
        return response.json()
    })
}

function login(email, password){
	promises=[get_location(), fetch_login(email, password)]
	return Promise.all(promises)
	.then((data) => {
		state.user_location(data[0])
		state.user(data[1])
		return data[1]
	})
}

function fetch_register(name, email, password, password_confirmation){
	return fetch(`${REMOTE}/users.json`, {
		method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
		body: JSON.stringify({
	  		user: {
	    		password: password,
	    		password_confirmation: password_confirmation,
				email: email,
				name: name
			}
        })
    }).then((response) => {
    	if (response.status > 399) throw 'Sign up failed. Please enter valid parameters.'
        	return response.json() 
    })
}

function register(name, email, password, password_confirmation){
	promises=[get_location(), fetch_register(name, email, password, password_confirmation)]
	return Promise.all(promises)
	.then((data) => {
		state.user_location(data[0])
		state.user(data[1])
		return data[1]
	})
}

function fetch_profileUpdate(name, email, phone, company, linkedin, facebook, twitter, skype, instagram, github, site){
	return state.user()
		.then((user) => user.id)
		.then((user_id) => {
			return fetch(`${REMOTE}/update.json`, {
		        method: 'post',
		        headers: {
		            'Accept': 'application/json',
		            'Content-Type': 'application/json'
		        },
		        body: JSON.stringify({
		            id: user_id,
		            user: {
		                name: name,
						email: email,
						phone: phone,
						company: company,
						linkedin: linkedin,
						facebook: facebook,
						twitter: twitter,
						skype: skype,
						instagram: instagram,
						github: github,
						site: site
		            }
		        })
		    }).then((response) => {
		        if (response.status > 400) throw response
		        return response.json()
		    }).then((updatedInfo) => state.user(updatedInfo))
		})
}

function profileUpdate(name, email, phone, company, linkedin, facebook, twitter, skype, instagram, github, site){
	return fetch_profileUpdate(name, email, phone, company, linkedin, facebook, twitter, skype, instagram, github, site)
}

function fetch_proximityList(data_source){
    var promises=[state.user(), state.user_location()]
    return Promise.all(promises)
      	.then((res) => {
        	return fetch(`${REMOTE}/users/${res[1].lat}/${res[1].lng}/${res[0].id}`)
		    .then((response) => response.json())
		    .then((responseData) => {
             	return {
	             	dataSource: data_source.cloneWithRows(responseData),
	              	loaded: true
	             }
        	})
    	})
    	.catch((...a) => console.log(...a))
}

function proximityList(data_source){
	console.log('FETCHING ONCE AGAIN')
	return fetch_updateLocation()
	.then(() => fetch_proximityList(data_source))
}

function fetch_inboundContacts(data_source){
	return state.user()
		.then((user) => user.id)
		.then((user_id) => {
			return fetch(`${REMOTE}/inbound/${user_id}`)
	      	.then((response) => response.json())
	      	.then((responseData) => {
	        	return {
		          	dataSource: data_source.cloneWithRows(responseData),
		          	loaded: true
	        	}
	      	})
		})
		.catch((...a) => console.log(...a))   
}

function inboundContacts(data_source){
	return fetch_inboundContacts(data_source)
}

function fetch_outboundContacts(data_source){
	return state.user()
		.then((user) => user.id)
		.then((user_id) => {
			return fetch(`${REMOTE}/outbound/${user_id}`)
	      	.then((response) => response.json())
	      	.then((responseData) => {
	        	return {
		          	dataSource: data_source.cloneWithRows(responseData),
		          	loaded: true
	        	}
	      	})
		})
		.catch((...a) => console.log(...a))   
}

function outboundContacts(data_source){
	return fetch_outboundContacts(data_source)
}

function fetch_requestUser(outbound_id, name, email, phone, company, linkedin, facebook, twitter, skype, instagram, github, site){
	return state.user()
		.then((user) => user.id)
		.then((user_id) => {
			return fetch(`${REMOTE}/share/${user_id}/${outbound_id}`, {
		        method: 'post',
		        headers: {
		            'Accept': 'application/json',
		            'Content-Type': 'application/json'
		        },
		        body: JSON.stringify({
		            share: {
		                name: name,
						email: email,
						phone: phone,
						company: company,
						linkedin: linkedin,
						facebook: facebook,
						twitter: twitter,
						skype: skype,
						instagram: instagram,
						github: github,
						site: site
		            }
		        })
		    }).then((response) => {
		        if (response.status > 399) throw "Could not request this user at the moment."
		    })
		})
}

function requestUser(outbound_id, name, email, phone, company, linkedin, facebook, twitter, skype, instagram, github, site){
	return fetch_requestUser(outbound_id, name, email, phone, company, linkedin, facebook, twitter, skype, instagram, github, site)
}

function fetch_contactList(data_source){
	return state.user()
		.then((user) => user.id)
		.then((user_id) => {
			return fetch(`${REMOTE}/contacts/${user_id}`)
	      	.then((response) => response.json())
	      	.then((responseData) => {
	        	return {
		          	dataSource: data_source.cloneWithRows(responseData),
		          	loaded: true
	        	}
	      	})
		})
		.catch((...a) => console.log(...a))  
}

function contactList(data_source){
	return fetch_contactList(data_source)
}

function fetch_contactProfile(other_id){
	return state.user()
		.then((user) => user.id)
		.then((user_id) => {
			return fetch(`${REMOTE}/contacts/profile/${user_id}/${other_id}.json`)
		})
		.then((response) => {
	        if (response.status > 399) throw 'Could not retrieve information'
	        return response.json()
		})
}

function contactProfile(other_id){
	return fetch_contactProfile(other_id)
}

function deleteContact(other_id, data_source){
	return state.user()
		.then((user) => user.id)
		.then((user_id) => {
			return fetch(`${REMOTE}/contacts/${user_id}/${other_id}`, {
				method: 'delete'
			})
		})
		.then((response) => { 
		    if (response.status > 399) throw "Could not delete this user"
		    	return response.json()
		})
		.then((responseData) => {
			return {
				dataSource: data_source.cloneWithRows(responseData)
			}
		})
}

function denyRequest(other_id, data_source){
	return state.user()
		.then((user) => user.id)
		.then((user_id) => {
			return fetch(`${REMOTE}/inbound/${user_id}/${other_id}`, {
				method: 'delete'
			})
		})
		.then((response) => { 
		    if (response.status > 399) throw "Could not deny request"
		        return response.json()
		})
		.then((responseData) => {
			return {
				dataSource: data_source.cloneWithRows(responseData)
			}
		})
}

function cancelRequest(other_id, data_source){
	return state.user()
		.then((user) => user.id)
		.then((user_id) => {
			return fetch(`${REMOTE}/outbound/${user_id}/${other_id}`, {
				method: 'delete'
			})
		})
		.then((response) => { 
		    if (response.status > 399) throw "Could not cancel request"
		        return response.json()
		})
		.then((responseData) => {
			return {
				dataSource: data_source.cloneWithRows(responseData)
			}
		})
}

function importImages(...args){
	return args.reduce( (memo, name) => {
		memo[name] = require(`image!${name}`)
		return memo
	}, {})
}

const state = {
	user: prop('user'),
	outbound_user: prop('outbound_user'),
	connected_user: prop('connected_user'),
	user_location: prop('user_location'),
	login: login,
	register: register,
	proximityList: proximityList,
	inboundContacts: inboundContacts,
	outboundContacts: outboundContacts,
	profileUpdate: profileUpdate,
	requestUser: requestUser,
	contactList: contactList,
	contactProfile: contactProfile,
	deleteContact: deleteContact,
	denyRequest: denyRequest,
	cancelRequest: cancelRequest,
	importImages,
	images: importImages('email', 'phone', 'linkedin', 'facebook', 'twitter', 'skype', 'instagram', 'github', 'site')
}


module.exports = state