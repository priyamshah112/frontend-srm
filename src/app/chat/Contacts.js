import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { List, ListItem, ListItemText, ListItemAvatar, Input, Typography, Avatar, Badge } from '@material-ui/core'
import moment from 'moment'
import { useReactToPrint } from 'react-to-print'
import groupicon from '../../assets/images/chat/group.png'
import RenderUsers from './RenderGroupUser'
import { ArrowForward, CloseRounded } from '@material-ui/icons'
import Group from '../../assets/images/chat/group.png'
import search from '../../assets/images/chat/ic_search.svg'
import { colors } from '../common/ui/appStyles'
import ChatService from './ChatService'
import {
	getChatUsers,
} from '../redux/actions/chat.action'

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
	headingContainer: {
		display: 'flex',
		alignItems: 'center',
		'& div': {
			margin: '3px',
		},
		width: '100%',
	},
	groupUser: {
		flexDirection: 'row',
	},
	nextText: {
		marginTop: 5,
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
	closeBtn: {
		backgroundColor: theme.palette.background.default,
		float: 'right',
		position: 'absolute',
		right: 10,
		borderRadius: '50%',
		padding: 2,
		cursor: 'pointer',
	},
	borderBottom: {
		borderBottom: `1px solid ${theme.palette.grey[400]}`,
		width: '100%',
		minHeight: 50,
	},
	inputContainer: {
		borderBottomWidth: 1,
		borderBottomStyle: 'solid',
		borderBottomColor: '#ccc',
		flexDirection: 'row',
		width: '100%',
		padding: 5,
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
	smiley: {
		height: 16,
		width: undefined,
		cursor: 'pointer',
	},
	externalIcon:{
		background: colors.tint,
		borderRadius: '50%',
		width: '50px',
	}
}))

const BACKEND_IMAGE_URL = process.env.REACT_APP_BACKEND_IMAGE_URL

const Contacts = (props) => {
	const {	
		current_user_id,	
		contacts,
		setGroup
	} = props

	const classes = useStyles()
	const [filteredContacts, setFilteredContacts] = useState([])
	const [filter, setFilter] = useState('')
	const [selectedUsers, setSelectedUsers] = useState([])
	const [groupInfo, showGroupInfo] = useState(false)
	const [groupName, setGroupName ] = useState('')
	const selectedRole =JSON.parse(localStorage.getItem('srmSelectedRole'));
	useEffect(() => {
		setFilteredContacts(contacts)
	},[contacts])

	const handleFilter = (event) => {
		setFilter(event.target.value)
		setFilteredContacts(contacts.filter((item) => 
			item.fullName.toLowerCase().search(event.target.value.toLowerCase()) !== -1
		))
	}

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

	const getUserIds = () => {
		let ids = []
		ids.push(current_user_id)
		selectedUsers.forEach((item) => {
			ids.push(item.id)
		})
		return ids
	}

	const handleCreateGroup = async() => {
		let data = {
			'users': getUserIds(),
			'group_name': groupName,
		};
		if(data.group_name === ''){
			return
		}
		try {
			const token = localStorage.getItem('srmToken')
			const response = await ChatService.createGroup(data, token)
			if (response.status === 200) {
				props.getChatUsers(
					{
						current_role: selectedRole,
					},
					true,
					{
						Authorization: `Bearer ${localStorage.getItem('srmToken')}`,
					}
				)
				setGroup(false)
			}
		} catch (error) {
			console.log(error)
		}
	}
	
	return (
		<>
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
				{selectedUsers.length === 0 && (
					<div
						onClick={() => setGroup(false)}
						className={classes.closeBtn}
					>
						<CloseRounded />
					</div>
				)}
				{selectedUsers.length > 0 && (
					<div
						onClick={() => {
							!groupInfo ? showGroupInfo(true) : handleCreateGroup()
						}}
						className={classes.nextBtn}
					>
						<Typography>
							<div className={classes.nextIcon}>
								<ArrowForward />
							</div>
							<span className={classes.nextText}>{ !groupInfo ? 'Next' : 'Done' }</span>
						</Typography>
					</div>
				)}
			</div>
			{	!groupInfo ?
				(
					<>
						<ListItem className={classes.inputContainer} alignItems='flex-start'>
							<Input
								id='search'
								placeholder='Search - Name/User ID'
								name='search'
								value={filter}
								onChange={handleFilter}
								className={classes.inputBorder}
								required={true}
								autoComplete={false}
								disableUnderline={true}
							/>
						</ListItem>
						<List className={classes.root}>
							{filteredContacts.map((user) => {
								let name = user.fullName
								let img = user.thumbnail
								let avatar = {}
								let message = ''
								let date = user.created_at
								if (user != undefined) {
									if (user.type == 'group') {
										name = user.group.name
										let groupimg = encodeURI(useReactToPrint.group.image)
										img = groupimg ? BACKEND_IMAGE_URL + '/' + groupimg : groupicon
										avatar = classes.avatarBackground
									}
								}
								return (
									<ListItem
										onClick={() => addContactToGroup(user)}
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
												variant={user.status}
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
					</>
				)
				:			
				(
					<ListItem className={classes.inputContainer} alignItems='flex-start'>
						<img src={Group} alt='Group' className={classes.externalIcon} />
						<Input
							placeholder=''
							name='groupName'
							value={groupName}
							onChange={(event) => setGroupName(event.target.value)}
							className={classes.inputBorder}
							disableUnderline={true}
						/>
						<Typography className={classes.emojiContainer}>
							<img src={search} className={classes.smiley} alt='' />
						</Typography>
					</ListItem>
				)
			}			
		</>
	)
}

export default connect(null,{ getChatUsers })(Contacts)
