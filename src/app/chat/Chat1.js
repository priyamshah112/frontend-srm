import React, { useEffect, useState } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Badge from '@material-ui/core/Badge'
import { Typography } from '@material-ui/core'
import ChatService from './ChatService'
import groupicon from '../../assets/images/chat/group.png'
import moment from 'moment'
import { chats } from '../../firebaseInit'
var CryptoJS = require('crypto-js')

const StyledBadge = withStyles((theme) => ({
	badge: {
		backgroundColor: '#44b700',
		color: '#44b700',
		boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
		'&::after': {
			position: 'absolute',
			top: 0,
			left: 0,
			width: '100%',
			height: '100%',
			borderRadius: '50%',
			content: '""',
		},
	},
}))(Badge)

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		backgroundColor: theme.palette.background.paper,
	},
	ListItemText: {
		width: '60%',
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
		cursor: 'pointer',
	},
	roleDetails: {
		position: 'absolute',
		right: 15,
		top: 30,
	},
	date: {
		color: theme.palette.grey[400],
		fontSize: 14,
		marginBottom: 3,
		fontWeight: 200,
		textTransform: 'capitalize',
	},
	avatarBackground: {
		background: theme.palette.primary.main,
	},
	groupIconContainer: {
		height: 35,
		width: 35,
		borderRadius: '50%',
		padding: 5,
		justifyContent: 'center',
		verticalAlign: 'middle',
		background: theme.palette.primary.main,
	},
}))

const BACKEND_IMAGE_URL = process.env.REACT_APP_BACKEND_IMAGE_URL
export default function Chat({
	filter,
	updateGroup = false,
	selectContact,
	selectedRole,
	newGroup,
	userInfo,
	showContact,
	refreshChat,
	setRefreshChat,
}) {
	const classes = useStyles()
	const [Chats, setChats] = useState([])
	const [Users, setUsers] = useState([])
	const [filteredChat, setFilteredChats] = useState([])
	const [offset, setOffset] = useState(100)
	const [currentPage, setCurrentPage] = useState(0)

	useEffect(()=>{
		chats().on('value', snapshot=>{
			let cs = snapshot.val()
			console.log("SnapShot", cs)
			fetchChats()
		})
	}, [])
	useEffect(() => {
		if (updateGroup) {
			setFilteredChats([...Users])
		} else if (filter == '') {
			setFilteredChats([...Chats])
		} else {
			if (Chats.length > 0) {
				let chat = Chats.filter((c) => {
					let name
					let role
					if (c.members != null) {
						if (c.group != null) {
							name = c.group.name
						} else {
							return false
						}
						role = ''
					} else {
						name = c.firstname + ' ' + c.lastname
						role = c.roles[0].name
					}
					return (
						name.toLowerCase().includes(filter.toLowerCase()) ||
						role.toLowerCase().includes(filter.toLowerCase())
					)
				})
				setFilteredChats([...chat])
			}
		}
	}, [filter])

	useEffect(() => {
		if (refreshChat) {
			fetchChats()
			setRefreshChat(false)
		}
	}, [refreshChat])

	useEffect(() => {
		if (showContact) {
			setChats([])
			setFilteredChats([])
			fetchContacts()
		} else {
			setChats([])
			setFilteredChats([])
			fetchChats()
		}
	}, [showContact])

	useEffect(() => {
		if (newGroup) {
			setChats([])
			setFilteredChats([])
			fetchContacts()
		}
	}, [newGroup])

	useEffect(() => {
		if (updateGroup) {
			showContacts()
		}
	}, [updateGroup])

	const showContacts = async () => {
		try {
			const token = localStorage.getItem('srmToken')
			const response = await ChatService.fetchChats({ selectedRole }, token)
			if (response.status === 200) {
				const { data } = response
				let chats = data.users
				setFilteredChats(chats.slice(currentPage, offset))
			}
		} catch (error) {
			console.log(error)
		}
	}

	const fetchContacts = async () => {
		if (newGroup) {
			if (Users.length == 0) {
				await fetchChats()
			}
			console.log(Users)
			setChats([...Users])
			let chats = [...Users]
			setFilteredChats(chats.slice(currentPage, offset))
		} else {
			setChats([...Chats, ...Users])
			let chats = [...Chats, ...Users]
			setFilteredChats(chats.slice(currentPage, offset))
		}
	}

	const fetchChats = async () => {
		try {
			const token = localStorage.getItem('srmToken')
			const response = await ChatService.fetchChats(selectedRole, token)
			if (response.status === 200) {
				let data = response.data.data;
				setChats(data)
				setFilteredChats(data)
				setUsers(data)
				
			}
		} catch (error) {
			console.log(error)
		}
	}

	const loadMoreItems = (event) => {
		console.log(event)
		if (event.target.scrollTop === event.target.scrollHeight) {
			//user is at the end of the list so load more items
			let start = currentPage + 1 * offset
			setCurrentPage(currentPage + 1)
			let chats = Chats.slice(start, offset)
			setFilteredChats([...filteredChat, ...chats])
		}
	}

	const getPlainMessage = (message, chat) => {
		var bytes = CryptoJS.AES.decrypt(message, 'chat' + chat.id)
		var msg = bytes.toString(CryptoJS.enc.Utf8)
		if (msg == '') {
			bytes = CryptoJS.AES.decrypt(
				message,
				'chat' + chat.messages[0].recievers[0].reciever.id
			)
			msg = bytes.toString(CryptoJS.enc.Utf8)
		}
		return msg
	}

	return (
		<div onScroll={(evt) => loadMoreItems(evt)}>
			<List className={classes.root}>
				{filteredChat.map((chat) => {
					let name = chat.firstname + ' ' + chat.lastname
					let img = chat.thumbnail
					let avatar = {}
					let message = ''
					let date = chat.created_at
					if (chat != undefined) {
						if (chat.type == 'group') {
							name = chat.group.name
							let groupimg = encodeURI(chat.group.image)
							img = groupimg ? BACKEND_IMAGE_URL + '/' + groupimg : groupicon
							avatar = classes.avatarBackground
						} else {
							if (chat.members != undefined) {
								let rec = chat.members.filter((c) => {
									return c.id != userInfo.id
								})[0]
								name = rec.firstname + ' ' + rec.lastname
								img = rec.thumbnail
							}
						}
					}
					if (chat.messages != undefined && chat.messages.length > 0) {
						message = getPlainMessage(
							chat.messages[chat.messages.length - 1].message,
							chat
						)
						date = chat.messages[chat.messages.length - 1].created_at
					}
					return (
						<ListItem
							onClick={() => selectContact(chat)}
							alignItems='flex-start'
							className={classes.listItem}
						>
							<ListItemAvatar>
								<StyledBadge
									overlap='circle'
									anchorOrigin={{
										vertical: 'bottom',
										horizontal: 'right',
									}}
									variant={chat.status}
								>
									<Avatar alt={name} src={img} className={avatar} />
								</StyledBadge>
							</ListItemAvatar>
							<ListItemText
								className={classes.ListItemText}
								secondaryTypographyProps={{ style: { width: '60%' } }}
								primary={name}
								secondary={message}
							/>
							<div className={classes.roleDetails}>
								<Typography className={classes.date}>
									{moment(date).fromNow()}
								</Typography>
							</div>
						</ListItem>
					)
				})}
			</List>
		</div>
	)
}
