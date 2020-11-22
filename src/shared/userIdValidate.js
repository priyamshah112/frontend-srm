export const emailValidate = (userData) => {
	console.log(userData)
	const email_reg = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm
	let email_res = email_reg.test(userData)
	if (email_res) {
		return true
	} else {
		return false
	}
}

export const phoneValidate = (userData) => {
	const phone_reg = /(?:\s+|)((0|(?:(\+|)91))(?:\s|-)*(?:(?:\d(?:\s|-)*\d{9})|(?:\d{2}(?:\s|-)*\d{8})|(?:\d{3}(?:\s|-)*\d{7}))|\d{10})(?:\s+|)/gm
	let phone_res = phone_reg.test(userData)
	if (phone_res) {
		return true
	} else {
		return false
	}
}
