import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'

let SnackBarRef = null

class SnackBar extends React.Component {
	constructor(props) {
		super(props)
		SnackBarRef = this
		this.state = {
			openSnackBar: false,
			error404: false,
			error500: false,
		}
	}

	open = (status, success, message) => {
		console.log('console', status)
		this.setState({ openSnackBar: true })
		if (status === 500) {
			this.setState({ error500: true })
		} else {
			this.setState({ error404: true })
		}
		this.setState({ success })
		this.setState({ message })
	}

	handleSnackbarClose = () => {
		this.setState({ openSnackBar: false })
	}

	render() {
		return (
			<>
				<Snackbar
					open={this.state.openSnackBar}
					autoHideDuration={10000}
					onClose={this.handleSnackbarClose}
				>
					<Alert
						onClose={this.handleSnackbarClose}
						severity={this.state.success ? 'success' : 'error'}
					>
						{this.state.message
							? this.state.message
							: this.state.error404
							? 'Error Occured'
							: this.state.error500
							? 'Internal server error! Please try after some time.'
							: ''}
					</Alert>
				</Snackbar>
			</>
		)
	}
}

export default SnackBar
export { SnackBarRef }
