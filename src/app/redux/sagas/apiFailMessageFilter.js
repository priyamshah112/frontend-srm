export const extractArrayMessage = (message) => {
	const keys = Object.keys(message)
	let msgStr = ''
	if (keys.length) {
		keys.map((key) => {
			msgStr +=
				key == 'non_field_errors' ? message[key] : `${key}: ${message[key]} \n`
		})
	}
	return msgStr
}

export const ApiFailMessageFilter = (error = {}) => {
	const message = {}

	if (error.code === 'ECONNABORTED') {
		message.networkError = true
	}

	const { response = {} } = error
	if (response) {
		const { data = {} } = response
		message.status = response.status || data.http_status_code

		if (data.message) {
			message.message =
				typeof data.message === 'object'
					? extractArrayMessage(data.message)
					: data.message
		}
	}

	if (!message.message) {
		message.message = 'Something Went Wrong!'
	}

	return message
}
