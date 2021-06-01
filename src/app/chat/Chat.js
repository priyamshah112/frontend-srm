import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { Typography, Input, List, ListItem, ListItemText,ListItemAvatar } from '@material-ui/core'
import { Avatar, Badge } from '@material-ui/core'
import groupicon from '../../assets/images/chat/group.png'
import moment from 'moment'
import { useReactToPrint } from 'react-to-print'
import { setChatUser } from '../redux/actions/chat.action'

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
	inputContainer: {
		borderBottomWidth: 1,
		borderBottomStyle: 'solid',
		borderBottomColor: '#ccc',
		flexDirection: 'row',
		width: '100%',
		padding: 5,
	},	
	inputBorder: {
		width: '90%',
	},
}))

const BACKEND_IMAGE_URL = process.env.REACT_APP_BACKEND_IMAGE_URL

const Chat = (props) => {
	const {
		userInfo,
		chatUsers
	} = props
	const classes = useStyles()
	const [filteredUsers, setFilteredUsers] = useState([])
	const [filter, setFilter] = useState('')
	
	useEffect(() => {
		setFilteredUsers(chatUsers)
	},[chatUsers])

	const handleFilter = (event) => {
		setFilter(event.target.value)
		setFilteredUsers(chatUsers.filter((item) => 
			item.name.toLowerCase().search(event.target.value.toLowerCase()) !== -1
		))
	}
	return (
		<div>
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
				{filteredUsers.map((user) => {
					let name = user.name
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
						} else {
							if (useReactToPrint.members != undefined) {
								let rec = useReactToPrint.members.filter((c) => {
									return c.id != userInfo.id
								})[0]
								name = rec.firstname + ' ' + rec.lastname
								img = rec.thumbnail
							}
						}
					}
					return (

						<ListItem
							onClick={() => props.setChatUser(user)}
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
		</div>
	)
}

export default connect(null,{ setChatUser })(Chat);