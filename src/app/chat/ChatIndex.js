import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import UserIcon from '../../assets/images/chat/User.svg'
import { Input, ListItem } from '@material-ui/core'
import { ArrowForward, CloseRounded } from '@material-ui/icons'
import search from '../../assets/images/chat/ic_search.svg'
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded'
import RenderUsers from './RenderGroupUser'
import Group from '../../assets/images/chat/group.png'
import GroupDetails from './GroupName'
import { ToastContainer } from 'react-toastify'
import { connect } from 'react-redux'
import * as actions from '../../app/auth/store/actions'
import ChatService from './ChatService'
import closeIcon from '../../assets/images/chat/remove.svg'
import * as ChatActions from '../../app/chatUsers/store/action'
import Chat from './Chat'
import { Lang } from '../../Constants/Languages/English'
import { FirebaseDatabaseNode } from '@react-firebase/database'
import { chats } from '../../firebaseInit'

const useStyles = makeStyles((theme) => ({
	cursorPointer: {
		cursor: 'pointer',
	},
	root: {
		marginLeft: '13px',
		marginTop: '15px',
		marginRight: '13px',
	},
	headingContainer: {
		display: 'flex',
		alignItems: 'center',
		'& div': {
			margin: '3px',
		},
		width: '100%',
	},
	headingText: {
		fontWeight: 400,
		fontSize: '1rem',
		fontStyle: 'normal',
		color: theme.palette.common.bastille,
		width: '55%',
	},
	conversationContainer: {
		marginTop: '10px',
	},
	inputContainer: {
		borderBottomWidth: 1,
		borderBottomStyle: 'solid',
		borderBottomColor: '#ccc',
		flexDirection: 'row',
		width: '100%',
		padding: 5,
	},
	smiley: {
		height: 16,
		width: undefined,
		cursor: 'pointer',
	},
	emojiContainer: {
		height: '100%',
		justifyContent: 'center',
		flexDirection: 'column',
		marginTop: 8,
		alignItems: 'flex-end',
		alignContent: 'flex-end',
		textAlign: 'right',
		width: '10%',
	},
	inputBorder: {
		width: '90%',
	},
	title: {
		width: '80%',
	},
	addTaskIcon: {
		cursor: 'pointer',
		bottom: 0,
	},
	newGroup: {
		verticalAlign: 'middle',
		justifyContent: 'center',
		color: theme.palette.primary.main,
	},
	borderBottom: {
		borderBottom: `1px solid ${theme.palette.grey[400]}`,
		width: '100%',
		minHeight: 50,
	},
	closeBtn: {
		backgroundColor: theme.palette.background.default,
		float: 'right',
		position: 'absolute',
		right: 10,
		borderRadius: '50%',
		padding: 2,
		cursor: 'pointer',
	},
	nextBtn: {
		float: 'right',
		position: 'absolute',
		right: 15,
		cursor: 'pointer',
		color: theme.palette.primary.main,
		flexDirection: 'row',
		justifyContent: 'center',
	},
	nextIcon: {
		backgroundColor: theme.palette.primary.main,
		borderRadius: '50%',
		padding: 0,
		fontSize: 10,
		cursor: 'pointer',
		float: 'left',
		width: 25,
		marginTop: -10,
		color: theme.palette.common.white,
		boxShadow: '0px 0px 0px 0px #fff',
		height: 25,
	},
	nextText: {
		marginTop: 5,
	},
	groupUser: {
		flexDirection: 'row',
	},
	userContainer: {
		display: 'flex',
		alignItems: 'center',
		maxWidth: 230,
		flexDirection: 'row',
		overflow: 'auto',
		'-ms-overflow-style': 'none' /* Internet Explorer 10+ */,
		scrollbarWidth: 'none' /* Firefox */,
		'& ::-webkit-scrollbar': {
			display: 'none',
		},
	},
	newGrpPosition: {
		overflow: 'auto',
		textAlign: 'right',
	},
}))

const ChatIndex = (props) => {
	const classes = useStyles()
	const [filter, setFilter] = useState('')
	const [showContact, setShowContact] = useState(false)
	const [selectedUsers, setSelectedUsers] = useState([])
	const [newGroup, selectNewGroup] = useState(false)
	const [chat, setChat] = useState({})
	const [groupInfo, showGroupInfo] = useState(false)


	const addContactToGroup = (item) => {
		let users = selectedUsers
		let index = users.indexOf(item)
		if (index >= 0) {
			return
		}
		users.push(item)
		setSelectedUsers([...users])
	}

	const removeContactFromGroup = (item) => {
		let users = selectedUsers
		let index = users.indexOf(item)
		users.splice(index, 1)
		setSelectedUsers([...users])
	}

	const setNewGroup = (value) => {
		selectNewGroup(value)
	}

	const selectChat = async (chat) => {
		try {
			if (chat.messages != undefined) {
				fetchChat(chat)
			} else {
				setChat(chat)
				console.log(chat)
				props.setChat(chat)
			}
		} catch (error) {
			console.log(error)
		}
	}

	const fetchChat = async (chat) => {
		
		const token = localStorage.getItem('srmToken')
		const response = await ChatService.fetchChat(chat.id, token)
		if (response.status === 200) {
			const { data } = response
			setChat(data.chat)
			props.setChat(data.chat)
		}
	}

	const closeGroup = () => {
		showGroupInfo(false)
		setNewGroup(false)
		setSelectedUsers([])
		setFilter('')
	}

	if (groupInfo) {
		return <GroupDetails close={closeGroup} selectedUsers={selectedUsers} />
	}

	return (
		<>
			<div className={classes.root}>
				{!newGroup && (
					<div className={classes.headingContainer}>
						<div>
							<img src={UserIcon} alt='User' />
						</div>
						<Typography className={classes.headingText}>
							{' '}
							{Lang.HOME.CHATS}
						</Typography>
						<AddCircleRoundedIcon
							color='primary'
							className={classes.addTaskIcon}
							onClick={() => setNewGroup(true)}
						/>
						<div className={classes.newGrpPosition}>
							<Typography className={[classes.newGroup].join(' ')}>
								<span
									className={classes.cursorPointer}
									onClick={() => setNewGroup(true)}
								>
									{Lang.HOME.NEW_GROUP}
								</span>
							</Typography>
						</div>
					</div>
				)}
				{newGroup && (
					<div
						className={[
							classes.headingContainer,
							classes.groupUser,
							classes.borderBottom,
						].join(' ')}
					>
						<div className={classes.userContainer}>
							{selectedUsers.map((user) => (
								<RenderUsers
									user={user}
									removeContact={removeContactFromGroup}
								/>
							))}
						</div>
						{selectedUsers.length == 0 && (
							<div
								onClick={() => setNewGroup(false)}
								className={classes.closeBtn}
							>
								<CloseRounded />
							</div>
						)}
						{selectedUsers.length > 0 && (
							<div
								onClick={() => {
									showGroupInfo(true)
								}}
								className={classes.nextBtn}
							>
								<Typography>
									<div className={classes.nextIcon}>
										<ArrowForward />
									</div>
									<span className={classes.nextText}>Next</span>
								</Typography>
							</div>
						)}
					</div>
				)}

				{newGroup && groupInfo && (
					<ListItem className={classes.inputContainer} alignItems='flex-start'>
						<img src={Group} alt='Group' className={classes.externalIcon} />
						<Input
							id='search'
							placeholder='Search - Name/User ID'
							name='search'
							value={filter}
							onChange={(event) => setFilter(event.target.value)}
							className={classes.inputBorder}
							required={true}
							autoComplete={false}
							disableUnderline={true}
						/>
						<Typography className={classes.emojiContainer}>
							<img src={search} className={classes.smiley} />
						</Typography>
					</ListItem>
				)}

				<div className={classes.conversationContainer}>
					<ListItem className={classes.inputContainer} alignItems='flex-start'>
						<Input
							id='search'
							placeholder='Search - Name/User ID'
							name='search'
							value={filter}
							onChange={(event) => setFilter(event.target.value)}
							className={classes.inputBorder}
							required={true}
							autoComplete={false}
							onFocus={() => setShowContact(true)}
							disableUnderline={true}
						/>
						<Typography className={classes.emojiContainer}>
							<img
								onClick={() => setShowContact(false)}
								src={showContact ? closeIcon : search}
								className={classes.smiley}
							/>
						</Typography>
					</ListItem>
					<Chat
						props={props}
						setRefreshChat={props.setRefreshChat}
						refreshChat={props.refreshChat}
						showContact={showContact}
						userInfo={props.userInfo}
						newGroup={newGroup}
						selectedRole={props.selectedRole}
						selectContact={newGroup ? addContactToGroup : selectChat}
						filter={filter}
					/>
					<ToastContainer />
				</div>
			</div>
		</>
	)
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
		setChat: (chat) => dispatch(ChatActions.setChat(chat)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatIndex)
