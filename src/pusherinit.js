import Pusher from 'pusher-js'

Pusher.logToConsole = true

const pusher = new Pusher('f46f62bed20ef099aadf', {
	cluster: 'ap2',
	broadcaster: 'pusher',
	wsHost: process.env.REACT_APP_BACKEND_CHAT_URL,
	encrypted: true, //set it to true for https schema
	forceTLS: true, //set it to true for https schema
	wsPort: 6001, //used for http schema
	wssPort: 6001, //used for https schema
	disableStats: true,
	enabledTransports: ['ws', 'wss'],
	authEndpoint: `${process.env.REACT_APP_BACKEND_IMAGE_URL}/broadcasting/auth`,
	auth: {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('srmToken')}`,
		},
	},
})

pusher.connection.bind('error', function (err) {
	console.log('>>> detected limit error', err)
})

export const subscribeChannel = (id) => {
	const channel = pusher.subscribe(`private-App.User.${id}`)

	channel.bind('pusher:subscription_succeeded', function (members) {
		console.log('successfully subscribed!')
	})
	return channel
}

// pusher.allChannels().forEach(channel => console.log(channel.name));
