import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import SingleChat from './SingleChat'
import { useParams } from 'react-router-dom'
import ChatService from '../chat/ChatService'
import { connect } from 'react-redux'
import * as actions from '../../app/auth/store/actions'
import * as chatactions from '../../app/chatUsers/store/action'

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		backgroundColor: theme.palette.background.paper,
	},
	inline: {
		display: 'inline',
	},
	listItem: {
		backgroundColor: theme.palette.common.whiteSmoke,
		color: theme.palette.common.blackRussian,
		'&:hover': {
			backgroundColor: theme.palette.common.quartz,
		},
		borderRadius: '10px',
		fontSize: '0.875rem',
		fontWeight: 300,
		marginBottom: '12px',
	},
}))

function ChatFullScreen(props) {
	const classes = useStyles()
	const [chat, setChat] = useState(null)
	const { id } = useParams()
	useEffect(() => {
		fetchChat()
	}, [])

	useEffect(() => {
		fetchChat()
	}, [props])

	const fetchChat = async () => {
		try {
			const token = localStorage.getItem('srmToken')
			const response = await ChatService.fetchChat(id, token)
			if (response.status === 200) {
				const { data } = response
				setChat(data.chat)
			}
		} catch (error) {
			console.log(error)
		}
	}
	if (chat == null) {
		return <div></div>
	}
	return <SingleChat props={props} fullScreen={true} chat={chat} />
}
const mapStateToProps = (state) => {
	return {
		userInfo: state.auth.userInfo,
		token: state.auth.token,
		isAuthenticated: state.auth.token !== null,
		selectedRole: state.auth.selectedRole,
		changeRole: state.auth.changeRole,
		notificationCount: state.notification.notificationCount,
		chat: state.Chat.chat,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onChangeRoleStart: () => dispatch(actions.authInitiateRoleSelection()),
		setChatGroup: (group) => dispatch(chatactions.setGroup(group)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatFullScreen)
