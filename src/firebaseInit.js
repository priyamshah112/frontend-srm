import firebase from 'firebase/app'
import 'firebase/messaging'

const firebaseConfig = {
	apiKey: 'AIzaSyBLIub0OQQb8Yeb3SsfEDo3gggGaZIdoRU',
	authDomain: 'tsrm-2ec47.firebaseapp.com',
	databaseURL: 'https://tsrm-2ec47.firebaseio.com',
	projectId: 'tsrm-2ec47',
	storageBucket: 'tsrm-2ec47.appspot.com',
	messagingSenderId: '381477278187',
	appId: '1:381477278187:web:4e5a33b71b5c2c0f1b49ae',
	measurementId: 'G-5QQBDWX8VJ',
}

firebase.initializeApp(firebaseConfig)
let messaging
if (firebase.messaging.isSupported()) {
	messaging = firebase.messaging()
} else {
	messaging = null
}

export const requestFirebaseNotificationPermission = () =>
	new Promise((resolve, reject) => {
		Notification.requestPermission()
			.then((permission) => {
				if (permission === 'granted' && messaging) {
					return messaging.getToken()
				}
			})
			.then((firebaseToken) => {
				resolve(firebaseToken)
			})
			.catch((err) => {
				reject(err)
			})
	})

export const onMessageListener = () =>
	new Promise((resolve) => {
		messaging.onMessage((payload) => {
			resolve(payload)
		})
	})
